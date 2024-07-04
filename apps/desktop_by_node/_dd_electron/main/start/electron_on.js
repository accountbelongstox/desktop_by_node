const { app, globalShortcut } = require('electron');
const { file } = require('../../core_node/utils');
const { env,http } = require('../../core_node/practicals.js');
const { ctrl } = require('../../core_node/electron.js');

class electronListen {
    constructor() {
    }

    public_listeng(MainConf) {
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        })

        app.on("open-url", async (event, url) => {
            console.log(url) 
        })

        app.on('close', e => {
            e.preventDefault()
        })

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        })

        app.on('will-quit', () => {
            globalShortcut.unregisterAll();
        })
    }
}

electronListen.toString = () => '[class electronListen]';
module.exports = new electronListen();

