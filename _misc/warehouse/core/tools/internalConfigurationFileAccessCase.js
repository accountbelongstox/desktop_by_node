const path = require('path');
const stringCase = require("./stringCase.js");
const fileCase = require("./fileCase.js");
const winapiCase = require('./winapiCase.js');

class UpdataConfig {
    configCache = {}

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }

    default_config = {
        "#default_python": { value: 3.6, options: '' },
        "#default_java": { value: 9, options: '' },
        "#default_node": { value: 18, options: '' },
        "#default_open_soft_mode": { value: true, options: '' },
        "#soft_localpath": { value: `D:/applications`, options: '' },
        "#local_envdir": { value: `D:/lang_compiler`, options: '' },
        "#programing_dir": { value: `D:/programing`, options: '' },
        "#setting_soft_backup_switch": { value: false, options: '' },
        "#setting_soft_local_bakup_path": { value: ``, options: '' },
        "#backup_remoteurl": { value: `\\\\192.168.100.1\\router\\programing/root:password`, options: '' },
        "#setting_soft_remote_update_url": { value: `http://192.168.100.6:880`, options: '' },
        "#remote_soft_icon_conf": { value: `icons_base_cache.json`, options: '' },
        "#soft_link_variable": {
            value: `%UserProfile%/AppData/Local/Google -> Google
C:/Program Files/Google -> Google
C:/Program Files (x86)/Google -> Google/x86
%UserProfile%/AppData/Local/AVAST Software -> AVAST Software
C:/Program Files (x86)/AVAST Software -> AVAST Software
%UserProfile%/AppData/Local/Discord -> Discord
%UserProfile%/AppData/Local/AVG -> AVG
C:/Program Files/BraveSoftware -> BraveSoftware
C:/Program Files (x86)/Microsoft Visual Studio -> Microsoft Visual Studio
%UserProfile%/AppData/Local/AVG -> AVG`, options: ''
        },
    }

    
    getPublicConfigToHTML() {
        let config = this.event.get_config()
        if (Object.keys(config).length == 0) {
            config = this.get_default_config()
            this.event.cast_config(config)
        }
        return config
    }

    updateConfig(newConf, oldConf) {
        let isUpdate = false
        for (const key in newConf) {
            if (oldConf.hasOwnProperty(key)) {
                for (const subKey in newConf[key]) {
                    if (oldConf[key].hasOwnProperty(subKey)) {
                        let newValue = newConf[key][subKey]
                        let oldValue = oldConf[key][subKey]
                        if (newValue !== oldValue) {
                            oldConf[key][subKey] = newConf[key][subKey];
                            isUpdate = true
                        }
                    } else {
                        isUpdate = true
                        oldConf[key][subKey] = newConf[key][subKey];
                    }
                }
            } else {
                oldConf[key] = newConf[key];
            }
        }
        return oldConf, isUpdate
    }

    updateConfigAndSaveCache(newConf) {
        let oldConf = this.configCache
        let upConf, isUpdata = this.updateConfig(newConf, oldConf)
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        console.log(upConf, isUpdata )
        if (isUpdata) {
            this.configCache = upConf
        }
        return isUpdata,upConf
    }

    save_config(newwaitConf, file_name) {
        let isUpdata,newConf = this.updateConfigAndSaveCache(newwaitConf)
        if(!isUpdata)return 
        newConf = this.configCache
        delete newConf['viewIndex']
        for (const key in newConf) {
            if (typeof newConf[key] !== 'object') {
                continue
            }
            let value_type = `text`
            let value = newConf[key].value
            if (newConf[key].hasOwnProperty(`value_type`)) {
                value_type = newConf[key][`value_type`]
            }
            if (value_type == 'password') {
                newConf[key].value = stringCase.obfuscate(value)
            } else if (value_type == 'array') {
            } else if (value_type == 'boolean') {
                newConf[key].value = stringCase.to_boolean(value)
            }
        }
        file_name = fileCase.get_path(file_name)
        const extName = path.extname(file_name);
        if (extName == '.json') {
            let oldConf = fileCase.readJSON(file_name)
            fileCase.saveJSON(file_name, this.updateConfig(newConf, oldConf))
        } else {
            fileCase.saveFile(file_name, value)
        }
    }

    save_public_config(newConf) {
        let file_name = this.get_configfile()
        this.save_config(newConf, file_name)
    }

    obfuscate_JSON(json) {
        for (let key in json) {
            if (typeof json[key] === 'object') {
                json[key] = this.obfuscate_JSON(json[key]);
            } else if (key.startsWith('pwd')) {
                json[key] = stringCase.obfuscate(json[key]);
            }
        }
        return json;
    }

    deobfuscate_JSON(json) {
        if (typeof json !== 'object') {
            return json;
        }
        if (Array.isArray(json)) {
            return json;
        }
        const result = {};
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                let value = json[key];
                if (typeof value === 'object') {
                    result[key] = this.deobfuscate_JSON(value);
                } else if (typeof value == 'string') {
                    result[key] = stringCase.deobfuscate(value);
                } else {
                    result[key] = value;
                }
            }
        }
        return result;
    }

    async save_JSON(file_name, json) {
        json = this.obfuscate_JSON(json)
        fileCase.saveJSON(file_name, json)
    }

    update_get(file_name) {
        file_name = fileCase.get_path(file_name)
        if (!fileCase.isFile(file_name)) {
            return {}
        }
        let file_content = fileCase.readFile(file_name)
        const extName = path.extname(file_name);
        if (extName.toLowerCase() == '.json') {
            try {
                file_content = JSON.parse(file_content)
                file_content = this.deobfuscate_JSON(file_content)
            } catch (e) {
                file_content = {}
            }
        }
        return file_content
    }


    get_configfile() {
        return winapiCase.getPrivateUserDir(`setting.config.json`)
    }


    get_default_config() {
        let defalut_config = this.update_get(this.get_configfile())
        for (let default_key in this.default_config) {
            if (!defalut_config[default_key]) {
                defalut_config[default_key] = this.default_config[default_key]
            }
        }
        this.configCache = defalut_config
        return defalut_config
    }

    delete(key, file_name) {
        let file_content = this.update_get(file_name)
        if (typeof file_content == 'object') {
            delete file_content[key]
            fileCase.saveJSON(file_name, file_content)
        } else {
            if (key) {
                let lines = file_content.split("\n");
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i] == key) {
                        lines.splice(i, 1);
                        i--;
                    }
                }
                file_content = lines.join("\n");
            } else {
                file_content = ''
            }
            fileCase.saveFile(file_name, file_content)
        }
    }

}

module.exports = new UpdataConfig()