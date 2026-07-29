#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

XRAY_CONFIG="/etc/xray/config.json"
XRAY_SERVICE="/etc/systemd/system/xray.service"
INSTALL_MARKER="/etc/xray/.spellvpn-quick-installed"
LINKS_FILE="/root/spellvpn-links.txt"
REALITY_PORT="443"
SS_PORT="8388"
REALITY_SERVER_NAME="www.microsoft.com"

info() { printf '\033[1;34m[SpellVPN]\033[0m %s\n' "$*"; }
success() { printf '\033[1;32m[完成]\033[0m %s\n' "$*"; }
fail() { printf '\033[1;31m[停止]\033[0m %s\n' "$*" >&2; exit 1; }

if [[ "${EUID}" -ne 0 ]]; then
  fail "请先使用 root 登录服务器，再运行此脚本。"
fi

if [[ -f "${INSTALL_MARKER}" && -f "${LINKS_FILE}" ]]; then
  success "检测到本脚本已经安装过，现有配置不会被覆盖。"
  printf '\n'
  cat "${LINKS_FILE}"
  exit 0
fi

[[ -r /etc/os-release ]] || fail "无法识别系统，仅支持 Debian / Ubuntu。"
# shellcheck disable=SC1091
source /etc/os-release
case "${ID:-}" in
  debian|ubuntu) ;;
  *) fail "当前系统是 ${PRETTY_NAME:-未知系统}，此脚本仅支持 Debian / Ubuntu。" ;;
esac
command -v systemctl >/dev/null 2>&1 || fail "服务器没有 systemd，脚本无法安全配置自启动。"
command -v ss >/dev/null 2>&1 || fail "服务器缺少 ss 命令，请先安装 iproute2。"

if [[ -e "${XRAY_CONFIG}" || -e "${XRAY_SERVICE}" || -e /usr/local/bin/xray ]]; then
  fail "检测到已有 Xray 配置或服务。为避免破坏现有服务，脚本不会覆盖；请使用官网的进阶教程手动分配端口。"
fi

port_in_use() {
  local protocol="$1" port="$2"
  ss "-ln${protocol}"H 2>/dev/null | awk '{print $5}' | grep -Eq "(^|\\]):?${port}$|:${port}$"
}

info "检查端口占用……"
port_in_use t "${REALITY_PORT}" && fail "TCP ${REALITY_PORT} 已被占用，脚本不会修改现有服务。"
if port_in_use t "${SS_PORT}" || port_in_use u "${SS_PORT}"; then
  fail "TCP/UDP ${SS_PORT} 已被占用，脚本不会修改现有服务。"
fi

info "安装下载和校验工具……"
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl openssl python3 unzip

SERVER_IP="${1:-}"
if [[ -z "${SERVER_IP}" ]]; then
  SERVER_IP="$(curl -4fsS --max-time 10 https://api.ipify.org || true)"
fi
python3 - "${SERVER_IP}" <<'PY' || fail "无法自动获取公网 IPv4。请运行：bash spellvpn-quick-server.sh 你的公网IP"
import ipaddress
import sys
address = ipaddress.ip_address(sys.argv[1])
if address.version != 4 or not address.is_global:
    raise SystemExit(1)
PY

case "$(uname -m)" in
  x86_64|amd64) XRAY_ARCH="64" ;;
  aarch64|arm64) XRAY_ARCH="arm64-v8a" ;;
  *) fail "暂不支持 CPU 架构：$(uname -m)。" ;;
esac

WORK_DIR="$(mktemp -d)"
cleanup() { rm -rf "${WORK_DIR}"; }
trap cleanup EXIT

info "从 Xray 官方 GitHub 获取最新稳定版……"
RELEASE_JSON="${WORK_DIR}/release.json"
curl -fsSL --retry 3 --connect-timeout 10 \
  https://api.github.com/repos/XTLS/Xray-core/releases/latest \
  -o "${RELEASE_JSON}"

readarray -t RELEASE_DATA < <(python3 - "${RELEASE_JSON}" "${XRAY_ARCH}" <<'PY'
import json
import sys

release_path, arch = sys.argv[1:]
with open(release_path, encoding="utf-8") as handle:
    release = json.load(handle)
names = {
    f"Xray-linux-{arch}.zip": None,
    f"Xray-linux-{arch}.zip.dgst": None,
}
for asset in release.get("assets", []):
    if asset.get("name") in names:
        names[asset["name"]] = asset.get("browser_download_url")
if not all(names.values()):
    raise SystemExit("官方发布中缺少当前架构的安装包或校验文件")
print(release.get("tag_name", "unknown"))
print(names[f"Xray-linux-{arch}.zip"])
print(names[f"Xray-linux-{arch}.zip.dgst"])
PY
)

[[ "${#RELEASE_DATA[@]}" -eq 3 ]] || fail "无法解析 Xray 官方发布信息。"
XRAY_VERSION="${RELEASE_DATA[0]}"
XRAY_ZIP_URL="${RELEASE_DATA[1]}"
XRAY_DIGEST_URL="${RELEASE_DATA[2]}"
XRAY_ZIP="${WORK_DIR}/xray.zip"
XRAY_DIGEST="${WORK_DIR}/xray.zip.dgst"

curl -fsSL --retry 3 --connect-timeout 10 "${XRAY_ZIP_URL}" -o "${XRAY_ZIP}"
curl -fsSL --retry 3 --connect-timeout 10 "${XRAY_DIGEST_URL}" -o "${XRAY_DIGEST}"

EXPECTED_SHA256="$(awk -F'= ' '/^SHA2-256=/{print $2}' "${XRAY_DIGEST}")"
ACTUAL_SHA256="$(sha256sum "${XRAY_ZIP}" | awk '{print $1}')"
[[ -n "${EXPECTED_SHA256}" && "${ACTUAL_SHA256}" == "${EXPECTED_SHA256}" ]] \
  || fail "Xray 安装包校验失败，已停止安装。"

unzip -q "${XRAY_ZIP}" -d "${WORK_DIR}/xray"
install -m 0755 "${WORK_DIR}/xray/xray" /usr/local/bin/xray
install -d -m 0755 /usr/local/share/xray /etc/xray
for asset in geoip.dat geosite.dat; do
  [[ -f "${WORK_DIR}/xray/${asset}" ]] && install -m 0644 "${WORK_DIR}/xray/${asset}" "/usr/local/share/xray/${asset}"
done

if ! getent group xray >/dev/null; then
  groupadd --system xray
fi
if ! id xray >/dev/null 2>&1; then
  useradd --system --gid xray --home-dir /var/lib/xray --create-home --shell /usr/sbin/nologin xray
fi

UUID="$(xray uuid)"
KEY_OUTPUT="$(xray x25519)"
PRIVATE_KEY="$(printf '%s\n' "${KEY_OUTPUT}" | awk -F': ' '/^PrivateKey:/{print $2}')"
PUBLIC_KEY="$(printf '%s\n' "${KEY_OUTPUT}" | awk -F': ' '/^(Password \(PublicKey\)|Password|PublicKey):/{print $2; exit}')"
SHORT_ID="$(openssl rand -hex 8)"
SS_PASSWORD="$(openssl rand -base64 32 | tr -d '\n')"
[[ -n "${UUID}" && -n "${PRIVATE_KEY}" && -n "${PUBLIC_KEY}" ]] || fail "无法生成 Reality 密钥。"

cat >"${XRAY_CONFIG}" <<JSON
{
  "log": {
    "loglevel": "warning"
  },
  "inbounds": [
    {
      "tag": "vless-reality",
      "listen": "0.0.0.0",
      "port": ${REALITY_PORT},
      "protocol": "vless",
      "settings": {
        "clients": [
          {
            "id": "${UUID}",
            "flow": "xtls-rprx-vision"
          }
        ],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "raw",
        "security": "reality",
        "rawSettings": {
          "header": {
            "type": "none"
          }
        },
        "realitySettings": {
          "show": false,
          "target": "${REALITY_SERVER_NAME}:443",
          "xver": 0,
          "serverNames": [
            "${REALITY_SERVER_NAME}"
          ],
          "privateKey": "${PRIVATE_KEY}",
          "shortIds": [
            "${SHORT_ID}"
          ]
        }
      }
    },
    {
      "tag": "shadowsocks",
      "listen": "0.0.0.0",
      "port": ${SS_PORT},
      "protocol": "shadowsocks",
      "settings": {
        "method": "aes-256-gcm",
        "password": "${SS_PASSWORD}",
        "network": "tcp,udp"
      }
    }
  ],
  "outbounds": [
    {
      "tag": "direct",
      "protocol": "freedom"
    }
  ]
}
JSON
chown root:xray "${XRAY_CONFIG}"
chmod 0640 "${XRAY_CONFIG}"

cat >"${XRAY_SERVICE}" <<'UNIT'
[Unit]
Description=Xray service for SpellVPN quick server
Documentation=https://github.com/XTLS/Xray-core
After=network-online.target nss-lookup.target
Wants=network-online.target

[Service]
Type=simple
User=xray
Group=xray
Environment=XRAY_LOCATION_ASSET=/usr/local/share/xray
ExecStart=/usr/local/bin/xray run -c /etc/xray/config.json
Restart=on-failure
RestartSec=3s
LimitNOFILE=1048576
AmbientCapabilities=CAP_NET_BIND_SERVICE
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
NoNewPrivileges=true
PrivateTmp=true
ProtectHome=true
ProtectSystem=strict
ProtectKernelTunables=true
ProtectControlGroups=true

[Install]
WantedBy=multi-user.target
UNIT

info "检查配置并启动服务……"
/usr/local/bin/xray run -test -c "${XRAY_CONFIG}"
systemctl daemon-reload
systemctl enable --now xray
sleep 1
systemctl is-active --quiet xray || {
  journalctl -u xray --no-pager -n 30 >&2
  fail "Xray 启动失败，请根据上方日志排查。"
}

if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "^Status: active"; then
  info "检测到 UFW 已启用，添加所需规则……"
  ufw allow "${REALITY_PORT}/tcp" comment "SpellVPN VLESS Reality"
  ufw allow "${SS_PORT}/tcp" comment "SpellVPN Shadowsocks TCP"
  ufw allow "${SS_PORT}/udp" comment "SpellVPN Shadowsocks UDP"
else
  info "UFW 未启用，脚本不会自动启用防火墙，以免中断 SSH。请同时在云服务器控制台放行 TCP ${REALITY_PORT}、TCP/UDP ${SS_PORT}。"
fi

VLESS_LINK="vless://${UUID}@${SERVER_IP}:${REALITY_PORT}?encryption=none&flow=xtls-rprx-vision&security=reality&sni=${REALITY_SERVER_NAME}&fp=chrome&pbk=${PUBLIC_KEY}&sid=${SHORT_ID}&type=tcp&headerType=none#SpellVPN-Reality"
SS_USERINFO="$(python3 - "${SS_PASSWORD}" <<'PY'
import base64
import sys
print(base64.urlsafe_b64encode(f"aes-256-gcm:{sys.argv[1]}".encode()).decode().rstrip("="))
PY
)"
SS_LINK="ss://${SS_USERINFO}@${SERVER_IP}:${SS_PORT}#SpellVPN-Shadowsocks"

cat >"${LINKS_FILE}" <<EOF
SpellVPN 一键服务器（${XRAY_VERSION}）

VLESS Reality：
${VLESS_LINK}

Shadowsocks：
${SS_LINK}
EOF
chmod 0600 "${LINKS_FILE}"
touch "${INSTALL_MARKER}"
chmod 0600 "${INSTALL_MARKER}"

success "安装成功，Xray 已启动并设为开机自启。"
printf '\n%s\n\n' "请复制下面任意一条完整链接，在 SpellVPN 中选择“添加 → 从剪贴板/代理链接导入”："
cat "${LINKS_FILE}"
printf '\n%s\n' "以后可运行 cat ${LINKS_FILE} 再次查看链接。"
printf '%s\n' "请确认云服务器安全组已放行：TCP ${REALITY_PORT}、TCP/UDP ${SS_PORT}。"
