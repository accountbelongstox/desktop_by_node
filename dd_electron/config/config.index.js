'use strict';
const { env } = require('../node_provider/globalvars.js');
let frontend_prot = env.getEnv(`FRONTEND_PORT`,21354)
let frontend = env.getEnv(`FRONTEND`,`frontend`)
let frontend_command = env.getEnv(`FRONTEND_COMMAND`,`dev`)

module.exports = () => {
    const config = {};
    // climber ---------------------------
    config.climber = {
        executablePath: "chrome/chrome.exe",
    };

    config.openDevTools = false;

    config.MainConf = {
        title: "管理软件",
        frontendConfig: {
            frontend_build: "./public/dist",
            frontend_prot: frontend_prot,
            frontend_command: frontend_command,
            frontend: frontend,
        },
        windowResizable: true,
        electronFrame: false,
        fullscreenable: true,
        globalErrorTrapping: true,
        windowFrame: false,
        devTools: true,
        enableApplicationWindowTitle: false,
        embeddedPageOpen: true,
        embeddedPageMode: 'vue', // vue | html | react vue/react由serve启动, html由express启动
    };
    return {
        ...config
    };
};
