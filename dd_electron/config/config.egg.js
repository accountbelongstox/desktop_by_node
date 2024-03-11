// 此文件插入 ../electron/config/config.local.js 中
/*
插入代码,在最下加入
return {
  ... json.deepUpdate(config,require("../../dd_electron/main/config/config.egg"))
};
*/
'use strict';

module.exports = async () => {
  const config = {};


  config.openDevTools = false;
  
  return {
    ...config
  };
};
