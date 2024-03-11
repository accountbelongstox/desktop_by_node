const fs = require('fs');
const path = require('path');
const https = require('node:https');
const utilCase = require('./utilCase.js');
const fileCase = require('./fileCase.js');

class ImageLoader {
  imagePath = false

  setRef(win, app, event, config_base) {
    this.win = win
    this.app = app
    this.event = event
    this.config_base = config_base
  }

}

module.exports = new ImageLoader()
