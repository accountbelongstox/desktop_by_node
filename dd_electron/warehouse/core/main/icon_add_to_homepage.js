const path = require('path');
const utilCase = require('../tools/utilCase.js');
const stringCase = require('../tools/stringCase.js');
const fileCase = require('../tools/fileCase.js');
const shortcutIconCase = require("../tools/shortcutIconCase.js")
const electron = require('electron');
const htmlCase = require('../tools/htmlCase.js');
const { app, shell } = electron;
class Main {

    iconCache = {};
    totalLength = 0

    constructor() {

    }

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }
}

module.exports = new Main()