const utilCase = require("../tools/utilCase.js")
const { BrowserView, session, clipboard } = require('electron');
const path = require('path')
const stringCase = require("../tools/stringCase.js");
const httpCase = require("../tools/httpCase.js");
// const puppeteer = require('puppeteer-core');
const fileCase = require("../tools/fileCase.js");
const messageCase = require("../tools/messageCase.js");
const fs = require('fs');
const auto_update = require("../main/auto_update.js");
const winapiCase = require("../tools/winapiCase.js");
const htmlCase = require("../tools/htmlCase.js");
const initialize_environment_to_system = require("../main/initialize_environment_to_system.js");
const internalConfigurationFileAccessCase = require("../tools/internalConfigurationFileAccessCase.js");
let debug_send_event = false
let debug_recieve_event = false
let debug_recieve_execute_event = false
// const { dir } = require("console");

class Event {
    
    log(message) {
        messageCase.log(message)
    }

    success(message, timeout = 1500) {
        messageCase.success(message, timeout)
    }

    error(message, timeout = 1500) {
        messageCase.error(message, timeout)
    }

    confirm(message, timeout = 1500) {
        messageCase.confirm(message, timeout)
    }

    warn(message, timeout = 1500) {
        messageCase.warn(message, timeout)
    }

    async cast_config(raw_config, event) {
        let resolve_config = this.raw_toconfig(raw_config)
        console.log(`resolve_config`)
        console.log(resolve_config)
        for (const key in resolve_config) {
            let newValue = resolve_config[key]
            if (!this.config[key] || this.config[key] !== newValue) {
                this.config[key] = newValue;
            }
        }
        this.sendToWebSocket(`preload:cast_config`, this.config)
        internalConfigurationFileAccessCase.save_public_config(raw_config)
    }

    runexe(ele, callback) {
        if (this.config.default_open_soft_mode) {
            return this.runasadmin(ele, callback)
        } else {
            let file = ele['data-exec']
            let group = ele['data-group']
            return winapiCase.exec_explorer(file, group, this.config_base, callback)
        }
    }

    runasadmin(element_stringiry, callback) {
        let file = element_stringiry['data-exec']
        let group = element_stringiry['data-group']
        return winapiCase.exec_asadmin(file, group, this.config_base, ``, callback)
    }

    opendir(element_stringiry) {
        let file = element_stringiry['data-exec']
        let dir = path.dirname(file)
        winapiCase.exec_explorer(dir)
    }

    openicons() {
        winapiCase.exec_explorer(this.config_base.icon_dir)
    }

    openicondir(icon_group_name) {
        if (!icon_group_name) {
            return this.openicons()
        }
        if (typeof icon_group_name == 'object') {
            icon_group_name = icon_group_name['data-group']
        }
        icon_group_name = path.join(this.config_base.icon_dir, icon_group_name)
        winapiCase.exec_explorer(icon_group_name)
    }
    
    software_update() {
        if (!this.software_update_exec) {
            this.software_update_exec = true
            this.success(`正在执行升级,请稍等`)
            auto_update.execUpdate((is_success) => {
                if (is_success) {
                    setTimeout(() => {
                        this.relaunch()
                    }, 2000)
                } else {
                    this.software_update_exec = undefined
                }
            })
        }
    }

    insatllEvn(data, event) {
        if (data['data-env']) {
            let evn = data['data-env']
            switch (evn) {
                case "visualstudio":
                    initialize_environment_to_system.install_visualstudio()
            }
            console.log(data, event)
        }
    }
}

module.exports = Event