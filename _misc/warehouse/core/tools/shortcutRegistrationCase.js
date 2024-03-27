const { globalShortcut } = require('electron');

class GlobalShortcutCase {
    register_dict = {
        "F7": "start_cast", // 对应的event方法
        "F8": "stop_cast",
    }

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }

    shortcutKeyEffect() {
        for (const key in this.register_dict) {
            const event_name = this.register_dict[key]
            // 注册一个全局快捷键 Ctrl+Shift+X
            const ret = globalShortcut.register(key, () => {
                if (this.event[event_name]) {
                    this.event[event_name]()
                }
            });

            if (!ret) {
                console.error('Failed to register global shortcut');
            }
        }
    }

    
}

module.exports = new GlobalShortcutCase()