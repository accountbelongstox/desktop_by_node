const utilCase = require("../tools/utilCase.js")
const { BrowserView, session, clipboard } = require('electron');
const path = require('path')
const stringCase = require("../tools/stringCase.js");
const httpCase = require("../tools/httpCase.js");
// const puppeteer = require('puppeteer-core');
const fileCase = require("../tools/fileCase.js");
const messageCase = require("../tools/messageCase.js");
const fs = require('fs');
const auto_update = require("../main/auto_update.js");
const winapiCase = require("../tools/winapiCase.js");
const htmlCase = require("../tools/htmlCase.js");
const initialize_environment_to_system = require("../main/initialize_environment_to_system.js");
const internalConfigurationFileAccessCase = require("../tools/internalConfigurationFileAccessCase.js");
let debug_send_event = false
let debug_recieve_event = false
let debug_recieve_execute_event = false
// const { dir } = require("console");

class Event {
    Browsers = []
    winBrowsers = []
    viewsdata = []
    view_height = 50
    login_account = []
    close_confirm = false
    close_countnum = 0
    config = {}//界面配置文件,该配置文件是实时更新
    raw_config = {}
    currentReadMessageIndex = 0
    chatsendviewroleindex = 0
    cidRawData = {}
    cidWsRawDatas = {}
    first_cast_config = null

    constructor(win, app, config_base, configuration_access) {
        this.win = win
        this.winBrowsers.push(win)
        this.app = app
        this.config_base = config_base
        this.configuration_access = configuration_access
    }

    setCidRawData(cid, data) {
        this.cidRawData[cid] = data
    }

    getCidRawData(cid, del = false) {
        let result = this.cidRawData[cid]
        if (del) delete this.cidRawData[cid]
        return result
    }

    setWSCidRawData(wsCId, data) {
        let cid = data.cid
        if (!this.cidWsRawDatas[wsCId]) {
            this.cidWsRawDatas[wsCId] = {}
        }
        this.cidWsRawDatas[wsCId][cid] = data
    }

    getWSCidRawData(wsCId, cid) {
        if (this.cidWsRawDatas[wsCId] && this.cidWsRawDatas[wsCId][cid]) {
            let callbak = this.cidWsRawDatas[wsCId][cid]
            delete this.cidWsRawDatas[wsCId][cid]
            return callbak;
        }
        return null;
    }

    setWin(win) {
        if (win) this.win = win
    }

    back_applications() {
    }

    get_status(status = 'danger', info = "") {
        return `<span class="badge badge-pill badge-${status}">${info}</span>`
    }

    showsettings() {
        this.win.webContents.executeJavaScript('document.querySelector(".sessting_page").style.display="block"')
    }

    show() {
        this.win.webContents.executeJavaScript('document.querySelector(".sessting_page").style.display="none"')
    }

    get_config(name) {
        if (name && this.config) {
            return this.config[name]
        } else {
            return this.config
        }
    }

    async chatsend(data, event) {
        const x = parseInt(data.x)
        const y = parseInt(data.y)
        const bx = parseInt(data.bx)
        const by = parseInt(data.by)
        const role = data.role
        let mode = data.mode
        if (!mode) {
            mode = 'all'
        }
        let views = []
        switch (mode) {
            case "single":
                views = [this.Browsers[role]]
                break
            case "all":
                views = this.Browsers
                break
            case "cycle":
                this.Browsers.forEach((view, index) => {
                    let viewsdata = this.get_viewsdata({
                        target_role: index,
                        return: true,
                    })
                    if (viewsdata && viewsdata.AccountStatsu && viewsdata.AccountStatsu == '已进入房间') {
                        views.push(view)
                    }
                })

                if (this.chatsendviewroleindex >= views.length) {
                    this.chatsendviewroleindex = 0
                }
                views = [views[this.chatsendviewroleindex]]
                this.chatsendviewroleindex++
                break
        }

        const previousClipboardContent = clipboard.readText();
        const textToCopy = await this.readMessage();
        clipboard.writeText(textToCopy);
        views.forEach((browserView, index) => {
            browserView.webContents.sendInputEvent({
                type: 'mouseDown',
                x: x,
                y: y,
                globalX: x,
                globalY: y,
                button: 'left',
                clickCount: 1,
            });
            // 发送鼠标抬起事件
            browserView.webContents.sendInputEvent({
                type: 'mouseUp',
                x: x,
                y: y,
                globalX: x,
                globalY: y,
                button: 'left',
                clickCount: 1,
            });
            // 模拟按下 Control+V (粘贴)
            browserView.webContents.sendInputEvent({
                type: 'keyDown',
                keyCode: 'V',
                modifiers: ['control'],
            });

            browserView.webContents.sendInputEvent({
                type: 'keyUp',
                keyCode: 'V',
                modifiers: ['control'],
            });
            // 粘贴操作完成后，将剪切板内容还原为之前的内容
            browserView.webContents.send('preload:execute', {
                action: 'sendMessage',
                data: {
                    message: clipboard.readText()
                }
            })
        })
        // let browserView = this.Browsers[role]
        setTimeout(() => {
            clipboard.writeText(previousClipboardContent);
        }, 200)
    }

    click_browserView(data, event) {
        let role = data.role
        let x = parseInt(data.x)
        let y = parseInt(data.y)
        let browserView = this.Browsers[role]
        browserView.webContents.sendInputEvent({
            type: 'mouseDown',
            x: x,
            y: y,
            globalX: x,
            globalY: y,
            button: 'left',
            clickCount: 1,
        });
        // 发送鼠标抬起事件
        browserView.webContents.sendInputEvent({
            type: 'mouseUp',
            x: x,
            y: y,
            globalX: x,
            globalY: y,
            button: 'left',
            clickCount: 1,
        });
    }

    log(message) {
        messageCase.log(message)
    }

    success(message, timeout = 1500) {
        messageCase.success(message, timeout)
    }

    error(message, timeout = 1500) {
        messageCase.error(message, timeout)
    }

    confirm(message, timeout = 1500) {
        messageCase.confirm(message, timeout)
    }

    warn(message, timeout = 1500) {
        messageCase.warn(message, timeout)
    }

    raw_toconfig(raw_config) {
        let config = {}
        for (let key in raw_config) {
            let value = raw_config[key]
            key = stringCase.getCastConfigKey(key)
            if (typeof value != 'string' && value != undefined && value != null) {
                value = value.value
            }
            config[key] = value
        }
        return config
    }

    get_viewsdata(data, event) {
        let target_role = data.target_role
        let role = data.role
        let target_data = this.viewsdata[target_role]
        if (data.return == true) {
            return target_data
        }
        this.Browsers[role].webContents.send('set_data', this.viewsdata[target_role]);
    }

    send(event_name, data) {
        this.sendToAllViewBrowsers(event_name, data)
        this.sendToAllWinBrowsers(event_name, data)
    }

    sendToWin(event_name, data) {
        this.sendToAllWinBrowsers(event_name, data)
    }

    sendToAllViewBrowsers(event_name, data) {
        this.sendToAllBrowsers(this.Browsers, event_name, data)
    }

    sendToAllWinBrowsers(event_name, data) {
        this.sendToAllBrowsers(this.winBrowsers, event_name, data)
    }

    sendToAllBrowsers(winBrowsers, event_name, data) {
        if (typeof data != 'object') {
            data = {
                data,
                rawData: {
                    event_name: null
                }
            }
        }
        if (!data.rawData) {
            data = {
                data,
                rawData: {
                    event_name: null
                }
            }
        }

        let main_class = 'preload'
        let recieve_on = event_name
        if (event_name && (event_name.includes(`:`) || event_name.includes(`.`))) {
            let recieve_parse = event_name.split(/[\:\.]+/)
            main_class = recieve_parse[0]
            recieve_on = recieve_parse[1]
        }
        let send_id = `send_to_view_` + stringCase.create_id()
        data.main_class = main_class
        data.recieve_on = recieve_on
        data.send_id = send_id
        if (!data.cid) data.cid = null
        winBrowsers.forEach((browser, index) => {
            if (data.viewIndex === undefined) {
                data.viewIndex = index
            }
            this.sendToView(`classified_receive`, data, browser)
        })
    }

    sendToView(event_name, data, browser) {
        browser.webContents.send(event_name, data);
    }

    sendToHtml(data, event) {
        if (!data) data = {}
        if (typeof data == "string") data = { data }
        let cid = typeof event === "object" && event !== null ? event.cid : null
        data.cid = cid
        data.usetime = null
        if (cid) {
            let rawData = this.getCidRawData(cid, true)
            if (rawData) {
                data.rawData = rawData
                data.startTime = rawData.startTime
                let endTime = Date.now()
                data.endTime = endTime
                data.usetime = endTime - data.startTime
            }
        }

        if (data.debug_recieve_event) {
        }
        httpCase.sendToWebSockets(null, data)
    }

    specifiedCall(data) {
        if (debug_recieve_event) {
            console.log('Received:');
            console.log(typeof data);
            console.log(data);
        }
        let cid = data.cid
        let wsClientFingerprint = data.wsClientFingerprint
        let args = data.args
        // this.setWSCidRawData(wsClientFingerprint, data)
        // event.cid = cid
        let event_token = data.event_name
        if (debug_send_event) {
            console.log(`\n\n>>>>>>>>>>>>>>>>>>>>>>${event_name}`)
            console.log(`cid`, cid)
            console.log(`args`, args)
            console.log(`data`)
            console.log(data)
        }

        let category_names = null
        let event_name = event_token
        if (event_token.includes('.') || event_token.includes(':')) {
            let event_parse = event_token.split(/[\:\.]+/);
            category_names = event_parse[0]
            event_name = event_parse[1]
        }
        let rawData = data
        this.execPublicEvent(category_names, event_name, args, rawData, wsClientFingerprint)
    }

    async execPublicEvent(category_name, event_name, args, rawData, wsClientFingerprint) {
        if (!category_name) {
            if (this.encyclopediaOfFunctions[`event_${data.page_name}`]) {
                category_name = `event_${data.page_name}`
            } else if (this.encyclopediaOfFunctions[`events`]) {
                category_name = `events`
            }
        }
        if (category_name) {
            this.execEventProcess(category_name, event_name, args, rawData, wsClientFingerprint)
        }
    }

    async execEventProcess(category_name, event_name, args, rawData, wsClientFingerprint) {
        if (this.encyclopediaOfFunctions[category_name]) {
            if (this.encyclopediaOfFunctions[category_name][event_name]) {
                let paramNames = utilCase.getParamNames(this.encyclopediaOfFunctions[category_name][event_name])
                let trans_args = args.slice();
                let isResult = undefined
                if (utilCase.isCallByParam(paramNames)) {
                    let callback = (...rArg) => {
                        isResult = true
                        let rData = {
                            data: rArg,
                            debug_send_event,
                            debug_recieve_event,
                            debug_recieve_execute_event,
                        }
                        if (debug_recieve_event) {
                            console.log(`rData`)
                            console.log(rData)
                        }
                        this.sendToWebSocket(null, rData, rawData, wsClientFingerprint)
                    }
                    trans_args = utilCase.arrangeAccordingToA(paramNames, callback, trans_args)
                    let data
                    if (utilCase.isAsyncFunction(this.encyclopediaOfFunctions[category_name][event_name])) {
                        data = await this.encyclopediaOfFunctions[category_name][event_name](...trans_args)
                    } else {
                        data = this.encyclopediaOfFunctions[category_name][event_name](...trans_args)
                    }
                    // 有可能该处函数执行两次该处函数
                    if (data && isResult === undefined) {
                        callback(data)
                    }
                } else if (utilCase.isPromise(this.encyclopediaOfFunctions[category_name][event_name])) {
                    this.encyclopediaOfFunctions[category_name][event_name](...args).then((...data) => {
                        let rData = {
                            data,
                            debug_send_event,
                            debug_recieve_event,
                            debug_recieve_execute_event,
                        }
                        this.sendToWebSocket(null, rData, rawData, wsClientFingerprint)
                    })

                    // AsyncFunction
                } else if (utilCase.isAsyncFunction(this.encyclopediaOfFunctions[category_name][event_name])) {
                    let data = await this.encyclopediaOfFunctions[category_name][event_name](...args)
                    let rData = {
                        data,
                        debug_send_event,
                        debug_recieve_event,
                        debug_recieve_execute_event,
                    }
                    this.sendToWebSocket(null, rData, rawData, wsClientFingerprint)
                } else {
                    let data = this.encyclopediaOfFunctions[category_name][event_name](...args)
                    let rData = {
                        data,
                        debug_send_event,
                        debug_recieve_event,
                        debug_recieve_execute_event,
                    }
                    this.sendToWebSocket(null, rData, rawData, wsClientFingerprint)
                }
            } else {
                console.log(`There is no "${event_name}" of the "${category_name}" by "this.encyclopediaOfFunctions".`)
            }
        } else {
            console.log(`If there is no "${category_name}" Class on the "this.encyclopediaOfFunctions()"`)
        }
    }

    sendToWebSocket(event_name, data, rawData,toAll=true) {
        let wsClientFingerprint = null
        if (rawData) {
            wsClientFingerprint = rawData.wsClientFingerprint
            data.rawData = rawData
            data.wsClientFingerprint = wsClientFingerprint
        } else {
            data = {
                wsClientFingerprint,
                data,
                rawData: {
                    event_name,
                    cid:null,
                }
            }
        }
        if(wsClientFingerprint)toAll = false
        data.cid = (rawData && rawData.cid) ? rawData.cid : null
        let main_class = 'preload'
        let recieve_on = event_name
        if (event_name && (event_name.includes(`:`) || event_name.includes(`.`))) {
            let recieve_parse = event_name.split(/[\:\.]+/)
            main_class = recieve_parse[0]
            recieve_on = recieve_parse[1]
        }
        let send_id = `send_to_view_` + stringCase.create_id()
        data.main_class = main_class
        data.recieve_on = recieve_on
        data.send_id = send_id
        if(toAll){
            httpCase.sendToAllWebSockets(data)
        }else{
            httpCase.sendToWebSockets(data, wsClientFingerprint)
        }
    }

    runexe(ele, callback) {
        if (this.config.default_open_soft_mode) {
            return this.runasadmin(ele, callback)
        } else {
            let file = ele['data-exec']
            let group = ele['data-group']
            return winapiCase.exec_explorer(file, group, this.config_base, callback)
        }
    }

    runasadmin(element_stringiry, callback) {
        let file = element_stringiry['data-exec']
        let group = element_stringiry['data-group']
        return winapiCase.exec_asadmin(file, group, this.config_base, ``, callback)
    }

    opendir(element_stringiry) {
        let file = element_stringiry['data-exec']
        let dir = path.dirname(file)
        winapiCase.exec_explorer(dir)
    }

    openicons() {
        winapiCase.exec_explorer(this.config_base.icon_dir)
    }

    openicondir(icon_group_name) {
        if (!icon_group_name) {
            return this.openicons()
        }
        if (typeof icon_group_name == 'object') {
            icon_group_name = icon_group_name['data-group']
        }
        icon_group_name = path.join(this.config_base.icon_dir, icon_group_name)
        winapiCase.exec_explorer(icon_group_name)
    }

    close_before() {
        this.Browsers.forEach((browserView, index) => {
            browserView.webContents.destroy();
            this.win.removeBrowserView(browserView);
        })
    }

    close_count(data, event) {
        if (this.close_confirm) {
            this.close_countnum++
            if (this.close_countnum >= this.Browsers.length || this.Browsers.length == 0) {
                this.close()
                return
            }
        }
    }

    close() {
        this.app.exit();
    }

    async start_cast() {
        if (this.Browsers.length > 1) {
            this.Browsers.forEach((browserView, index) => {
                this.viewsdata[index]['run_status'] = true
                browserView.webContents.send('cast_config', this.viewsdata[index]);
            })
        } else {
            let url = await this.win.webContents.executeJavaScript(`document.getElementById('pwd_main_url').value`)
            const width = 400;
            let height = 300;
            const Rows = 2;
            let y = 0;
            let x_base = 772

            let data = {
                url,
                width,
                height
            }

            const n = this.config.thread_number
            let window_height = parseInt(this.config_base.window_height)
            height = parseInt(window_height / n)
            let i = 0
            const intervalId = setInterval(() => {
                y = i * height;
                // data.x = x + x_base
                data.x = x_base
                data.y = y
                this.create_view(data)
                i++;
                if (i >= n) {
                    clearInterval(intervalId);
                }
            }, this.config.login_delay * 1000);
        }
    }

    create_view(data, event) {
        const browserView = new BrowserView({
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: false,
                preload: path.join(__dirname, '../preload/pre_view_loaded.js'), // 指定预加载脚本
                partition: `persist:view${this.Browsers.length}`,
            },
        });
        let url = data.url
        let height = 300
        let width = 400
        let x_base = 772
        let x = data.x
        let y = data.y
        if (x == undefined) {
            x = x_base
        }
        let y_base = 50
        if (y == undefined) {
            y = (this.Browsers.length * height) + y_base
        }
        this.win.addBrowserView(browserView);
        this.Browsers.push(browserView)
        let openDevTools = true
        if (!this.config_base.browserview_open_dev_tools) {
            openDevTools = false
        }
        browserView.setBounds({ x: x, y: y, width: width, height: height });
        browserView.webContents.loadURL(url);
        // browserView.webContents.on('did-finish-load', () => {
        //     // 在页面加载完成后执行自定义的 JS 代码
        //     // 覆盖 document.hidden 属性，始终返回 false（表示页面可见）
        //     // 改写 visibilitychange 事件的处理逻辑，使其在任何情况下都不会触发
        //     browserView.webContents.executeJavaScript(`
        //         Object.defineProperty(document, 'hidden', {
        //             get: () => false
        //         });
        //         const originalAddEventListener = EventTarget.prototype.addEventListener;
        //         EventTarget.prototype.addEventListener = function (type, listener, options) {
        //             if (type !== 'visibilitychange') {
        //                 originalAddEventListener.call(this, type, listener, options);
        //             }
        //         };
        //     `);
        // });
        if (openDevTools) {
            browserView.webContents.openDevTools({ mode: 'detach' });
        }
        browserView.webContents.audioMuted = true;
    }

    webViewCapturePage(data, event) {
        let role = data.role
        let browserView = this.Browsers[role]
        let view_number = this.Browsers.length
        setInterval(async () => {
            if (!this.capturePageCount) {
                this.capturePageCount = 0
            }
            const image = await browserView.webContents.capturePage();
            let filePath = path.join('screenshot', `screenshot-${view_number}-${this.capturePageCount}.png`);
            fs.writeFileSync(filePath, image.toPNG());
            this.capturePageCount++
        }, 1000)
    }

    image_load_error(img, event) {
        console.log(img)
    }

    minimize() {
        // this.win.setFullScreen(false)
        // this.win.minimize()
        this.win.minimize()
    }

    maximize() {
        // this.win.setFullScreen(true)
        this.win.maximize()
    }

    relaunch() {
        this.app.relaunch(); // 启动一个新的进程
        this.app.exit(); // 关闭当前进程
    }

    software_update() {
        if (!this.software_update_exec) {
            this.software_update_exec = true
            this.success(`正在执行升级,请稍等`)
            auto_update.execUpdate((is_success) => {
                if (is_success) {
                    setTimeout(() => {
                        this.relaunch()
                    }, 2000)
                } else {
                    this.software_update_exec = undefined
                }
            })
        }
    }

    insatllEvn(data, event) {
        if (data['data-env']) {
            let evn = data['data-env']
            switch (evn) {
                case "visualstudio":
                    initialize_environment_to_system.install_visualstudio()
            }
            console.log(data, event)
        }
    }
}

module.exports = Event