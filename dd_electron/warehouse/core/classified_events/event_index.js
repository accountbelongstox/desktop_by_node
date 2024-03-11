const initialize_environment_to_system = require("../main/initialize_environment_to_system")
const shortcutIconCase = require("../tools/shortcutIconCase")
const stringCase = require("../tools/stringCase")
const utilCase = require("../tools/utilCase")

class Main {
    init() { }

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }

    autoExecBeforeByLoaded() {
        // setInterval(() => {
        //     console.log(`event classifiedCallbacks`)
        //     console.log(this.event.sendToHtml('test'))
        // }, 2000)
    }

    autoExecAfterByLoaded() {

    }

    autoExecBeforeByLoadedOne() {

    }

    autoExecAfterByLoadedOne() {

    }

    closeAfterDestructe() {

    }

    async readIcons() {
        let localIconCache = shortcutIconCase.readIconJSONByLocal()
        if (Object.keys(localIconCache).length === 0) {
            localIconCache = await initialize_environment_to_system.MergeRemoteIconFiles()
        }
        localIconCache = shortcutIconCase.checkIconFileIsExists(localIconCache)
        shortcutIconCase.generateIconShortcut(localIconCache)

        if (!this.seticonsDirUpToCacheJSON) {
            this.seticonsDirUpToCacheJSON = setInterval(() => {
                console.log(`check new icons`)
                shortcutIconCase.iconsDirUpToCacheJSON(localIconCache)
            }, 3000)
        }

        localIconCache = shortcutIconCase.convertRightWebPages(localIconCache)

        return localIconCache
    }
}

module.exports = new Main()