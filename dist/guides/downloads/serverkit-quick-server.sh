#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

SCRIPT_VERSION="2.0.0"
XRAY_CONFIG="/etc/xray/config.json"
XRAY_SERVICE="/etc/systemd/system/xray.service"
INSTALL_MARKER="/etc/xray/.serverkit-quick-installed"
URL_FILE="/root/serverkit-subscription-url.txt"
NODES_FILE="/root/serverkit-subscription-nodes.txt"
WEB_ROOT="/var/www/serverkit"
SUBSCRIPTION_DIR="/var/lib/serverkit-subscriptions"
SUBSCRIPTION_PORT="9443"
REALITY_SERVER_NAME="www.amazon.com"
TCP_PORTS=(80 443 8388 8443 2053 2083 2087 2096 9443)

info() { printf '\033[1;34m[ServerKit]\033[0m %s\n' "$*"; }
success() { printf '\033[1;32m[完成]\033[0m %s\n' "$*"; }
fail() { printf '\033[1;31m[停止]\033[0m %s\n' "$*" >&2; exit 1; }

if [[ "${EUID}" -ne 0 ]]; then
  fail "请先使用 root 登录服务器，再运行此脚本。"
fi

if [[ -f "${INSTALL_MARKER}" && -s "${URL_FILE}" ]]; then
  success "检测到本脚本已经安装过，现有配置不会被覆盖。"
  printf '\n订阅 URL：\n'
  cat "${URL_FILE}"
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
  fail "检测到已有 Xray 配置或服务。为避免破坏现有服务，脚本不会覆盖。"
fi
if [[ -e /etc/nginx/sites-available/serverkit-subscription ]]; then
  fail "检测到已有 ServerKit 订阅服务，脚本不会覆盖。"
fi

port_in_use() {
  local protocol="$1" port="$2"
  ss "-ln${protocol}"H 2>/dev/null | awk '{print $5}' | grep -Eq "(^|\\]):?${port}$|:${port}$"
}

info "检查端口占用……"
for port in "${TCP_PORTS[@]}"; do
  port_in_use t "${port}" && fail "TCP ${port} 已被占用，脚本不会修改现有服务。"
done
port_in_use u 8388 && fail "UDP 8388 已被占用，脚本不会修改现有服务。"

info "安装基础组件……"
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends \
  ca-certificates curl nginx-light openssl python3 snapd unzip
systemctl enable --now snapd.socket
snap wait system seed.loaded

if command -v ufw >/dev/null 2>&1 && ufw status | grep -q '^Status: active'; then
  info "先放行 TCP 80，以便签发和续期 IP HTTPS 证书……"
  ufw allow 80/tcp comment "ServerKit certificate validation" >/dev/null
fi

SERVER_IP="${1:-}"
if [[ -z "${SERVER_IP}" ]]; then
  SERVER_IP="$(curl -4fsS --max-time 10 https://api.ipify.org || true)"
fi
python3 - "${SERVER_IP}" <<'PY' || fail "无法自动获取公网 IPv4。请运行：bash serverkit-quick-server.sh 你的公网IP"
import ipaddress
import sys
address = ipaddress.ip_address(sys.argv[1])
if address.version != 4 or not address.is_global:
    raise SystemExit(1)
PY

COUNTRY_CODE="$(curl -fsS --max-time 10 "https://ipwho.is/${SERVER_IP}" 2>/dev/null | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("country_code") or "ZZ")' 2>/dev/null || printf ZZ)"
[[ "${COUNTRY_CODE}" =~ ^[A-Z]{2}$ ]] || COUNTRY_CODE="ZZ"

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

info "启动证书验证站点……"
install -d -m 0755 "${WEB_ROOT}/.well-known/acme-challenge" "${SUBSCRIPTION_DIR}"
cat > /etc/nginx/sites-available/serverkit-subscription <<NGINX
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location ^~ /.well-known/acme-challenge/ {
        root ${WEB_ROOT};
        default_type text/plain;
    }

    location / { return 404; }
}
NGINX
if [[ -L /etc/nginx/sites-enabled/default ]]; then
  unlink /etc/nginx/sites-enabled/default
fi
ln -sfn /etc/nginx/sites-available/serverkit-subscription /etc/nginx/sites-enabled/serverkit-subscription
nginx -t
systemctl enable --now nginx
systemctl restart nginx

info "签发受信任的 IP HTTPS 证书……"
if snap list certbot >/dev/null 2>&1; then
  snap refresh certbot
else
  snap install certbot --classic
fi
CERTBOT_BIN="/snap/bin/certbot"
[[ -x "${CERTBOT_BIN}" ]] || fail "Certbot 安装失败。"
CERT_NAME="serverkit-ip-${SERVER_IP//./-}"
"${CERTBOT_BIN}" certonly \
  --non-interactive \
  --agree-tos \
  --register-unsafely-without-email \
  --preferred-profile shortlived \
  --webroot \
  --webroot-path "${WEB_ROOT}" \
  --ip-address "${SERVER_IP}" \
  --cert-name "${CERT_NAME}"
CERT_SOURCE="/etc/letsencrypt/live/${CERT_NAME}"
[[ -r "${CERT_SOURCE}/fullchain.pem" && -r "${CERT_SOURCE}/privkey.pem" ]] \
  || fail "证书签发失败。请确认云安全组已放行 TCP 80。"

install -d -o root -g xray -m 0750 /etc/xray/tls
install -o root -g xray -m 0644 "${CERT_SOURCE}/fullchain.pem" /etc/xray/tls/fullchain.pem
install -o root -g xray -m 0640 "${CERT_SOURCE}/privkey.pem" /etc/xray/tls/privkey.pem

REALITY_UUID="$(xray uuid)"
KEY_OUTPUT="$(xray x25519)"
PRIVATE_KEY="$(printf '%s\n' "${KEY_OUTPUT}" | awk -F': ' '/^PrivateKey:/{print $2}')"
PUBLIC_KEY="$(printf '%s\n' "${KEY_OUTPUT}" | awk -F': ' '/^(Password \(PublicKey\)|Password|PublicKey):/{print $2; exit}')"
SHORT_ID="$(openssl rand -hex 8)"
SS_PASSWORD="$(openssl rand -base64 32 | tr -d '\n')"
VMESS_UUID="$(xray uuid)"
VLESS_TLS_UUID="$(xray uuid)"
TROJAN_PASSWORD="$(openssl rand -base64 32 | tr -d '\n')"
VLESS_GRPC_UUID="$(xray uuid)"
TROJAN_WS_PASSWORD="$(openssl rand -base64 32 | tr -d '\n')"
[[ -n "${PRIVATE_KEY}" && -n "${PUBLIC_KEY}" ]] || fail "无法生成 Reality 密钥。"

cat >"${XRAY_CONFIG}" <<JSON
{
  "log": {"loglevel": "warning"},
  "inbounds": [
    {
      "tag": "serverkit-reality",
      "listen": "0.0.0.0",
      "port": 443,
      "protocol": "vless",
      "settings": {
        "clients": [{"id": "${REALITY_UUID}", "flow": "xtls-rprx-vision"}],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "raw",
        "security": "reality",
        "rawSettings": {"header": {"type": "none"}},
        "realitySettings": {
          "show": false,
          "target": "${REALITY_SERVER_NAME}:443",
          "xver": 0,
          "serverNames": ["${REALITY_SERVER_NAME}"],
          "privateKey": "${PRIVATE_KEY}",
          "shortIds": ["${SHORT_ID}"]
        }
      }
    },
    {
      "tag": "serverkit-shadowsocks",
      "listen": "0.0.0.0",
      "port": 8388,
      "protocol": "shadowsocks",
      "settings": {"method": "aes-256-gcm", "password": "${SS_PASSWORD}", "network": "tcp,udp"}
    },
    {
      "tag": "serverkit-vmess-ws-tls",
      "listen": "0.0.0.0",
      "port": 8443,
      "protocol": "vmess",
      "settings": {"clients": [{"id": "${VMESS_UUID}", "alterId": 0}]},
      "streamSettings": {
        "network": "ws", "security": "tls",
        "tlsSettings": {
          "serverName": "${SERVER_IP}", "alpn": ["http/1.1"], "minVersion": "1.2",
          "certificates": [{"certificateFile": "/etc/xray/tls/fullchain.pem", "keyFile": "/etc/xray/tls/privkey.pem"}]
        },
        "wsSettings": {"path": "/serverkit-vmess", "host": "${SERVER_IP}"}
      }
    },
    {
      "tag": "serverkit-vless-tls",
      "listen": "0.0.0.0",
      "port": 2053,
      "protocol": "vless",
      "settings": {"clients": [{"id": "${VLESS_TLS_UUID}", "flow": "xtls-rprx-vision"}], "decryption": "none"},
      "streamSettings": {
        "network": "raw", "security": "tls", "rawSettings": {"header": {"type": "none"}},
        "tlsSettings": {
          "serverName": "${SERVER_IP}", "alpn": ["h2", "http/1.1"], "minVersion": "1.2",
          "certificates": [{"certificateFile": "/etc/xray/tls/fullchain.pem", "keyFile": "/etc/xray/tls/privkey.pem"}]
        }
      }
    },
    {
      "tag": "serverkit-trojan-tls",
      "listen": "0.0.0.0",
      "port": 2083,
      "protocol": "trojan",
      "settings": {"clients": [{"password": "${TROJAN_PASSWORD}"}]},
      "streamSettings": {
        "network": "raw", "security": "tls", "rawSettings": {"header": {"type": "none"}},
        "tlsSettings": {
          "serverName": "${SERVER_IP}", "alpn": ["h2", "http/1.1"], "minVersion": "1.2",
          "certificates": [{"certificateFile": "/etc/xray/tls/fullchain.pem", "keyFile": "/etc/xray/tls/privkey.pem"}]
        }
      }
    },
    {
      "tag": "serverkit-vless-grpc-tls",
      "listen": "0.0.0.0",
      "port": 2087,
      "protocol": "vless",
      "settings": {"clients": [{"id": "${VLESS_GRPC_UUID}"}], "decryption": "none"},
      "streamSettings": {
        "network": "grpc", "security": "tls",
        "grpcSettings": {"serviceName": "serverkit-grpc", "multiMode": false},
        "tlsSettings": {
          "serverName": "${SERVER_IP}", "alpn": ["h2"], "minVersion": "1.2",
          "certificates": [{"certificateFile": "/etc/xray/tls/fullchain.pem", "keyFile": "/etc/xray/tls/privkey.pem"}]
        }
      }
    },
    {
      "tag": "serverkit-trojan-ws-tls",
      "listen": "0.0.0.0",
      "port": 2096,
      "protocol": "trojan",
      "settings": {"clients": [{"password": "${TROJAN_WS_PASSWORD}"}]},
      "streamSettings": {
        "network": "ws", "security": "tls",
        "wsSettings": {"path": "/serverkit-trojan", "host": "${SERVER_IP}"},
        "tlsSettings": {
          "serverName": "${SERVER_IP}", "alpn": ["http/1.1"], "minVersion": "1.2",
          "certificates": [{"certificateFile": "/etc/xray/tls/fullchain.pem", "keyFile": "/etc/xray/tls/privkey.pem"}]
        }
      }
    }
  ],
  "outbounds": [{"tag": "direct", "protocol": "freedom"}]
}
JSON
chown root:xray "${XRAY_CONFIG}"
chmod 0640 "${XRAY_CONFIG}"

cat >"${XRAY_SERVICE}" <<'UNIT'
[Unit]
Description=Xray service for ServerKit quick server
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

info "检查配置并启动节点……"
/usr/local/bin/xray run -test -c "${XRAY_CONFIG}"
systemctl daemon-reload
systemctl enable --now xray
sleep 1
systemctl is-active --quiet xray || {
  journalctl -u xray --no-pager -n 30 >&2
  fail "Xray 启动失败，请根据上方日志排查。"
}

SUBSCRIPTION_TOKEN="$(openssl rand -hex 32)"
python3 - "${XRAY_CONFIG}" "${SERVER_IP}" "${PUBLIC_KEY}" "${COUNTRY_CODE}" "${NODES_FILE}" <<'PY'
import base64
import json
import sys
from urllib.parse import quote

path, server, public_key, country_code, output = sys.argv[1:]
config = json.load(open(path, encoding="utf-8"))
by_tag = {item.get("tag"): item for item in config.get("inbounds", [])}
if country_code == "ZZ":
    prefix = "🌐 ZZ"
else:
    flag = "".join(chr(0x1F1E6 + ord(letter) - ord("A")) for letter in country_code)
    prefix = f"{flag} {country_code}"

def name(protocol):
    return quote(f"{prefix} · {protocol}", safe="")

reality = by_tag["serverkit-reality"]
client = reality["settings"]["clients"][0]
short_id = reality["streamSettings"]["realitySettings"]["shortIds"][0]
links = [
    f"vless://{client['id']}@{server}:443?encryption=none&flow=xtls-rprx-vision"
    f"&security=reality&sni=www.amazon.com&fp=chrome&pbk={public_key}&sid={short_id}"
    f"&type=tcp&headerType=none#{name('VLESS Reality')}"
]
ss = by_tag["serverkit-shadowsocks"]["settings"]
ss_user = base64.urlsafe_b64encode(f"{ss['method']}:{ss['password']}".encode()).decode().rstrip("=")
links.append(f"ss://{ss_user}@{server}:8388#{name('Shadowsocks')}")
vmess_id = by_tag["serverkit-vmess-ws-tls"]["settings"]["clients"][0]["id"]
vmess = {
    "v": "2", "ps": f"{prefix} · VMess WS TLS", "add": server, "port": "8443",
    "id": vmess_id, "aid": "0", "scy": "auto", "net": "ws", "type": "none",
    "host": server, "path": "/serverkit-vmess", "tls": "tls", "sni": server,
}
links.append("vmess://" + base64.b64encode(json.dumps(vmess, ensure_ascii=False, separators=(",", ":")).encode()).decode())
vless_tls = by_tag["serverkit-vless-tls"]["settings"]["clients"][0]
links.append(f"vless://{vless_tls['id']}@{server}:2053?encryption=none&flow=xtls-rprx-vision&security=tls&sni={server}&type=tcp&headerType=none#{name('VLESS TLS')}")
trojan = by_tag["serverkit-trojan-tls"]["settings"]["clients"][0]["password"]
links.append(f"trojan://{quote(trojan, safe='')}@{server}:2083?security=tls&sni={server}&type=tcp&headerType=none#{name('Trojan TLS')}")
grpc = by_tag["serverkit-vless-grpc-tls"]["settings"]["clients"][0]["id"]
links.append(f"vless://{grpc}@{server}:2087?encryption=none&security=tls&sni={server}&type=grpc&serviceName=serverkit-grpc&mode=gun#{name('VLESS gRPC TLS')}")
trojan_ws = by_tag["serverkit-trojan-ws-tls"]["settings"]["clients"][0]["password"]
links.append(f"trojan://{quote(trojan_ws, safe='')}@{server}:2096?security=tls&sni={server}&type=ws&host={server}&path=%2Fserverkit-trojan#{name('Trojan WS TLS')}")
with open(output, "w", encoding="utf-8") as handle:
    handle.write("\n".join(links) + "\n")
PY
chmod 0600 "${NODES_FILE}"
base64 -w 0 "${NODES_FILE}" >"${SUBSCRIPTION_DIR}/${SUBSCRIPTION_TOKEN}"
printf '\n' >>"${SUBSCRIPTION_DIR}/${SUBSCRIPTION_TOKEN}"
chmod 0644 "${SUBSCRIPTION_DIR}/${SUBSCRIPTION_TOKEN}"

cat > /etc/nginx/sites-available/serverkit-subscription <<NGINX
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    location ^~ /.well-known/acme-challenge/ { root ${WEB_ROOT}; default_type text/plain; }
    location = /sub/${SUBSCRIPTION_TOKEN} { return 301 https://\$host:${SUBSCRIPTION_PORT}\$request_uri; }
    location / { return 404; }
}
server {
    listen ${SUBSCRIPTION_PORT} ssl;
    listen [::]:${SUBSCRIPTION_PORT} ssl;
    server_name _;
    ssl_certificate ${CERT_SOURCE}/fullchain.pem;
    ssl_certificate_key ${CERT_SOURCE}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:ServerKit:1m;
    ssl_session_timeout 10m;
    location = /sub/${SUBSCRIPTION_TOKEN} {
        alias ${SUBSCRIPTION_DIR}/${SUBSCRIPTION_TOKEN};
        default_type text/plain;
        add_header Cache-Control "no-store" always;
        add_header X-Content-Type-Options "nosniff" always;
        limit_except GET HEAD { deny all; }
    }
    location / { return 404; }
}
NGINX
nginx -t
systemctl reload nginx

install -d -m 0755 /etc/letsencrypt/renewal-hooks/deploy
cat > /etc/letsencrypt/renewal-hooks/deploy/reload-serverkit.sh <<HOOK
#!/usr/bin/env bash
set -Eeuo pipefail
install -o root -g xray -m 0644 ${CERT_SOURCE}/fullchain.pem /etc/xray/tls/fullchain.pem
install -o root -g xray -m 0640 ${CERT_SOURCE}/privkey.pem /etc/xray/tls/privkey.pem
/usr/local/bin/xray run -test -c /etc/xray/config.json
/usr/sbin/nginx -t
/bin/systemctl restart xray
/bin/systemctl reload nginx
HOOK
chmod 0755 /etc/letsencrypt/renewal-hooks/deploy/reload-serverkit.sh

if command -v ufw >/dev/null 2>&1 && ufw status | grep -q '^Status: active'; then
  info "检测到 UFW 已启用，添加所需规则……"
  for port in "${TCP_PORTS[@]}"; do
    ufw allow "${port}/tcp" comment "ServerKit" >/dev/null
  done
  ufw allow 8388/udp comment "ServerKit Shadowsocks UDP" >/dev/null
else
  info "UFW 未启用，脚本不会自动启用防火墙，以免中断 SSH。"
fi

SUBSCRIPTION_URL="https://${SERVER_IP}:${SUBSCRIPTION_PORT}/sub/${SUBSCRIPTION_TOKEN}"
printf '%s\n' "${SUBSCRIPTION_URL}" >"${URL_FILE}"
chmod 0600 "${URL_FILE}"
printf 'version=%s\n' "${SCRIPT_VERSION}" >"${INSTALL_MARKER}"
chmod 0600 "${INSTALL_MARKER}"

/usr/local/bin/xray run -test -c "${XRAY_CONFIG}"
nginx -t
systemctl is-active --quiet xray
systemctl is-active --quiet nginx

success "安装成功：已生成 7 条真实国家标识的多协议节点。"
printf '\n订阅 URL（整行复制到 ServerKit）：\n%s\n\n' "${SUBSCRIPTION_URL}"
printf '%s\n' "以后可运行 cat ${URL_FILE} 再次查看。"
printf '%s\n' "云安全组需放行 TCP 80、443、8443、2053、2083、2087、2096、9443，以及 TCP/UDP 8388。"
