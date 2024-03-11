const preload = require('../preload/backend/index.js');
const electron_on = require('../start/electron_on.js');
const { http, env } = require('../../node_provider/practicals.js');

class lifeCycle {
  already_after_exec = null

  constructor() {
    // this === eeApp;
  }

  /**
   * main window have been loaded
   */

  async windowReady() {
    // do some things
    // const winOpt = this.config.windowsOption;
    // if (winOpt.show == false) {
    //   const win = this.electron.mainWindow;
    //   win.once('ready-to-show', () => {
    //     win.show();
    //     win.focus();
    //   })
    // }
  }

  async onlyExecuteOnceAfterLoading(callback) {
    if (this.already_after_exec) {
      return
    }
    this.already_after_exec = true
    try {
      await preload.start()
      if (callback) callback()
    }
    catch (e) {
      console.log(e)
    }
  }

  /**
   * core app have been loaded
   */
  async ready(MainConf) {
  }

  async loaded(MainConf) {
			electron_on.public_listeng(MainConf)
  }
  

  /**
   * electron app ready
   */
  async electronAppReady() {
    // do some things
  }


  /**
   * before app close
   */
  async beforeClose() {
    // do some things

  }
}

lifeCycle.toString = () => '[class lifeCycle]';
module.exports = new lifeCycle();