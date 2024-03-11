const { app, globalShortcut } = require('electron');
const { file } = require('../../node_provider/utils');
const { env,http } = require('../../node_provider/practicals.js');
const { ctrl } = require('../../node_provider/electron.js');

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

