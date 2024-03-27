// const httpCase = require("../tools/httpCase.js");
//const stringCase = require("../tools/stringCase.js");
const winapiCase = require('../tools/winapiCase.js');
const timingTaskAddCase = require('../tools/timingTaskAddCase.js');
const backupSoftwares = require('../main/system_backup.js');
const newInstallSystem = require('../main/initialize_environment_to_system.js');
const htmlCase = require("../tools/htmlCase.js");
const auto_update = require("../main/auto_update.js");
const create_env_version = require('../main/create_env_version.js');
const shortcutIconCase = require('../tools/shortcutIconCase.js');

class Main {

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }

    async autoExecAfterByLoaded() {
        auto_update.checkUpdateOnlyExec()

        // shortcutIconCase.iconsDirUpToCacheJSON()
        
        timingTaskAddCase.register('0 1 * * *', "change_imagebackgroud", () => {
            // htmlCase.setBackgroundByNetwork('body')
        })

        // if (!winapiCase.hasUserData(`install.isInstalledTheSystem`)) {
        //     winapiCase.waitPublicConfig(() => {
        //         setTimeout(() => {
        //             newInstallSystem.newInstall()
        //         }, 3000)
        //     })
        // } else {
        //     iconAddToHomepage.addAllShortlistToHTML()
        //     timingTaskAddCase.register('00 07 * * *', "backup_wsl", () => {
        //         backupSoftwares.backup_wsl()
        //     })

        //     timingTaskAddCase.register('* * * * *', "backup_system_enviroment", () => {
        //         backupSoftwares.backup_listen()
        //     })
        // }
    }
}

module.exports = new Main()

