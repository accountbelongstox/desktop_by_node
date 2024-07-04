'use strict';

const _ = require('lodash');
const path = require('path');
const { Controller } = require('ee-core');
const {
    app: electronApp, dialog, shell, Notification,
    powerMonitor, screen, nativeTheme
} = require('electron');
const Conf = require('ee-core/config');
const Ps = require('ee-core/ps');
const Services = require('ee-core/services');
const Addon = require('ee-core/addon');

/**
 * 操作系统 - 功能demo
 * @class
 */
class TaskController extends Controller {

    constructor(ctx) {
        super(ctx);
    }


    installByZip(args) {

        console.log('ok')
        Services.get('zipinstall').downloadAndUnzip(args).then((success)=>{
            console.log(success)
        })

        return '安装中';
    }
}

TaskController.toString = () => '[class TaskController]';
module.exports = TaskController;