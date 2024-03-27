# 集成框架
<div align=center>
<h3>🎉🎉🎉 基于Egg-electron/ 的工作平台 🎉🎉🎉</h3>
</div>
<br>

## 下一个版本使用Rust.Tauri
## 项目依赖
NPM-depandecy:
    "lodash": "^4.17.21",
    "puppeteer": "^21.3.8",
    "puppeteer-extra": "^3.3.6",
    "puppeteer-extra-plugin-stealth": "^2.11.2",
    "random-useragent": "^0.5.0",
    "regedit": "^5.1.2",
    "serve-handler": "^6.1.5",
    "shortid": "^2.2.16",
    "user-agents": "^1.1.30",
    "uuid": "^9.0.1",
    "xmldom": "^0.6.0",
    "xpath": "^0.0.33"
    "cheerio": "^1.0.0-rc.12",
    "winreg": "^1.2.5",

window install
@echo off
yarn add lodash@^4.17.21 puppeteer@^21.3.8 puppeteer-extra@^3.3.6 puppeteer-extra-plugin-stealth@^2.11.2 random-useragent@^0.5.0 regedit@^5.1.2 serve-handler@^6.1.5 shortid@^2.2.16 user-agents@^1.1.30 uuid@^9.0.1 xmldom@^0.6.0 xpath@^0.0.33 cheerio@^1.0.0-rc.12 winreg@^1.2.5 express-ws winston yargs windows-shortcuts atob sharp

liunx bash
yarn add lodash@^4.17.21 puppeteer@^21.3.8 puppeteer-extra@^3.3.6 puppeteer-extra-plugin-stealth@^2.11.2 random-useragent@^0.5.0 regedit@^5.1.2 serve-handler@^6.1.5 shortid@^2.2.16 user-agents@^1.1.30 uuid@^9.0.1 xmldom@^0.6.0 xpath@^0.0.33 cheerio@^1.0.0-rc.12 winreg@^1.2.5 express-ws winston yargs windows-shortcuts atob sharp

# Core-ee 框架BUG
./node_modules/ee-core/ee/application.js  Ps.initMode(); 需要添加参数   Ps.initMode(module)
修复
./node_modules/ee-core/ps/index.js  
exports.initMode = function(mode) {
  if(process.env.EE_MODE !== undefined)return
  return process.env.EE_MODE = mode ? mode : 'framework';
} 添加代码   if(process.env.EE_MODE !== undefined)return