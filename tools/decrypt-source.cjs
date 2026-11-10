#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
function run() {
  const args = process.argv.slice(2);
  const values = {};
  for (let i=0;i<args.length;i+=2) {
    if (!['--key-file','--output'].includes(args[i]) || !args[i+1]) throw new Error('用法：node tools/decrypt-source.cjs --key-file /本地路径/developer-accounts-decryption-key.json --output ../source-recovered.zip');
    if (values[args[i]]) throw new Error('参数不能重复。');
    values[args[i]]=args[i+1];
  }
  if (!values['--key-file']) throw new Error('请使用 --key-file 指定单独保管的解密密钥文件。');
  const keyData=JSON.parse(fs.readFileSync(path.resolve(values['--key-file']),'utf8'));
  const key=Buffer.from(keyData.keyBase64url ?? '', 'base64url');
  if (key.length!==32) throw new Error('解密密钥格式不正确。');
  const encrypted=JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','source.encrypted.json'),'utf8'));
  if (encrypted.format!=='developer-accounts-encrypted-source-v1' || encrypted.cipher!=='aes-256-gcm') throw new Error('不支持的加密文件格式。');
  const keyId=crypto.createHash('sha256').update(key).digest('hex').slice(0,24);
  if (keyId!==encrypted.keyId) throw new Error('密钥与加密源码不匹配。');
  const output=path.resolve(values['--output'] ?? 'source-recovered.zip');
  if (fs.existsSync(output)) throw new Error('输出文件已存在，请指定另一个 --output 路径。');
  const decipher=crypto.createDecipheriv('aes-256-gcm',key,Buffer.from(encrypted.iv,'base64url'));
  decipher.setAAD(Buffer.from(encrypted.format+'|'+encrypted.keyId));
  decipher.setAuthTag(Buffer.from(encrypted.tag,'base64url'));
  const plain=Buffer.concat([decipher.update(Buffer.from(encrypted.data,'base64url')),decipher.final()]);
  if (crypto.createHash('sha256').update(plain).digest('hex')!==encrypted.sourceSha256) throw new Error('解密内容校验失败。');
  fs.writeFileSync(output,plain,{flag:'wx',mode:0o600});
  console.log('源码已解密为 ZIP：'+output);
}
try { run(); } catch (error) { console.error('解密失败：'+error.message); process.exitCode=1; }
