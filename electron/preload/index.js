/*************************************************
 ** preload为预加载模块，该文件将会在程序启动时加载 **
 *************************************************/
const Addon = require('ee-core/addon');

/**
 * 预加载模块入口
 */
module.exports = async () => {
  // Addon.get('tray').create();
  Addon.get('security').create();
  Addon.get('awaken').create();
  Addon.get('autoUpdater').create();
  
  const startByMain = require('../../dd_electron/main/startByMain');
  const dd_Electron = new startByMain();
  dd_Electron.start();
  
}




