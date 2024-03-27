const https = require('node:https');
const {  shell } = require('electron');
const http = require('node:http');
const fs = require('fs');
// const fileCase = require('./fileCase.js');
const querystring = require('querystring');
const path = require('path');
const fileCase = require('./fileCase');
const winapiCase = require('./winapiCase');
const zipCase = require('./zipCase');
const net = require('net');
const bodyParser = require('body-parser');

const express = require('express');
const expressWs = require('express-ws');

class HttpCase {
    startPort = 18000;
    expressApp = null
    expressWs = null
    connectedWebSockets = [];
    getClienWebcketsData = {}

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }

    async https_get(url) {
        return await this.get(url)
    }

    get(url) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : http;
            let totalBytes = 0;
            // let prevBytes = 0;
            let startTime = Date.now();
            const req = protocol.get(url, res => {
                if (res.statusCode !== 200) {
                    console.log(`http get error: statusCode(${res.statusCode})`)
                    resolve(null, Date.now() - startTime, 0);
                    return;
                }
                let data = [];
                res.on('data', chunk => {
                    data.push(chunk);
                    totalBytes += chunk.length;
                });
                res.on('end', () => {
                    resolve(Buffer.concat(data), Date.now() - startTime, totalBytes);
                });
            });
            req.on('error', error => {
                console.log(`http get error:`)
                console.log(error)
                resolve(null, Date.now() - startTime, 0);
            });
            req.end();
        }).catch(() => { })
    }

    async getJSON(url) {
        let data = await this.get(url)
        try {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf8')
            }
            data = JSON.parse(data)
            if (data === null) data = {}
            return data
        } catch (e) {
            // console.log(data)
            console.log(e)
            return {}
        }
    }

    async getText(url) {
        let data = await this.get(url)
        try {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf8')
            }
            return data
        } catch (e) {
            console.log(e)
            return ``
        }
    }

    getLastModified(url) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);

            const protocol = url.startsWith('https') ? https : http;
            const options = {
                hostname: urlObj.hostname,
                path: urlObj.pathname,
                method: 'HEAD'
            };

            const req = protocol.request(options, (res) => {
                console.log(res)
                if (res.headers['last-modified']) {
                    resolve(res.headers['last-modified']);
                } else {
                    resolve(null);
                }
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });
    }

    async readRemoteImage(url) {
        let data = await this.https_get(url)
        const imageBase64 = Buffer.from(data, 'binary').toString('base64');
        return imageBase64
    }

    getRemoteFileSize(url) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : http;
            protocol.request(url, { method: 'HEAD' }, (res) => {
                const size = parseInt(res.headers['content-length'], 10);
                resolve(size);
            }).on('error', reject).end();
        });
    }

    async compareFileSizes(remoteUrl, localPath) {
        if (!fileCase.isFile(localPath)) return false
        try {
            const remoteSize = await this.getRemoteFileSize(remoteUrl);
            const localSize = fileCase.getFileSize(localPath);
            console.log(`compareFileSizes : url:${remoteUrl},remoteSize:${remoteSize},localPath:${localPath}`)
            return remoteSize == localSize;
        } catch (err) {
            console.error("An error occurred:", err);
            return false;
        }
    }

    async compareFileSizesSycn(remoteUrl, localPath) {
        let compare = await this.compareFileSizes(remoteUrl, localPath)
        return compare
    }

    get_file(url, dest) {
        return new Promise(async (resolve, reject) => {
            if (!dest) {
                dest = this.getDefaultDownloadFileDir(url)
            }
            let result = {
                dest
            }
            let startTime = Date.now();
            if (fs.existsSync(dest)) {
                let compare = await this.compareFileSizes(url, dest)
                if (compare) {
                    result.success = true
                    result.usetime = Date.now() - startTime
                    return resolve(result)
                }
            }
            fileCase.mkbasedir(dest)
            const protocol = url.startsWith('https') ? https : http;
            const file = fs.createWriteStream(dest);
            const req = protocol.get(url, res => {
                if (res.statusCode !== 200) {
                    result.dest = false
                    result.success = false
                    result.usetime = Date.now() - startTime
                    resolve(result);
                    return;
                }
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    result.success = true
                    result.usetime = Date.now() - startTime
                    resolve(result)
                });
            });
            req.on('error', error => {
                fs.unlink(dest);
                result.dest = null
                result.success = false
                result.usetime = Date.now() - startTime
                resolve(result);
            });
            file.on('error', error => {
                console.log(`error`)
                console.log(error)
                fs.unlink(dest);
                result.dest = null
                result.success = false
                result.usetime = Date.now() - startTime
                resolve(result);
            });
            req.end();
        }).catch((err) => { console.log(err) })
    }

    async download(url, downloadDir) {
        if (!downloadDir) downloadDir = winapiCase.getDocumentsDir()
        let downname = url.split('/').pop()
        downname = this.unescape_url(downname)
        if (!downloadDir.endsWith(downname)) {
            downloadDir = path.join(downloadDir, downname)
        }
        await this.get_file(url, downloadDir);
        return downloadDir
    }

    async downloadAll(urls, directory, max_thread = 10) {
        let i = 0;
        let downloadQueue = async () => {
            if (i >= urls.length) {
                return Promise.resolve();
            }
            const url = urls[i++];
            let filename = url.split('/').pop()
            filename = this.unescape_url(filename)
            const filepath = `${directory}/${filename}`;
            return this.download(url, filepath)
                .then(downloadQueue)
                .catch(e => { })
        }
        const downloadPromises = Array(max_thread).fill(null).map(downloadQueue);
        return Promise.all(downloadPromises);
    }


    https_post(url, postData) {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const protocol = parsedUrl.protocol.startsWith('https') ? https : http;
            const defaultHeaders = {
                'Accept-Language': 'zh-CN,zh,en;q=0.9',
                'Sec-CH-UA': 'Not A;Brand\";v=\"99\" \"Chromium\";v=\"102\" \"Google Chrome\";v=\"102',
                'Sec-CH-UA-Mobile': '?0',
                'Sec-CH-UA-Platform': 'Windows',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(postData)),
            };
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.protocol.startsWith('https') ? (parsedUrl.port || 443) : (parsedUrl.port || 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'POST',
                headers: {
                    ...defaultHeaders
                }
            };
            const req = protocol.request(options, res => {
                let data = '';
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            });
            req.on('error', error => {
                reject(error);
            });
            req.write(JSON.stringify(postData));
            req.end();
        }).catch(() => { })
    }

    get_url_protocol(url) {
        let protocol;
        if (url.includes('://')) {
            protocol = url.split('://')[0] + '://';
        } else {
            protocol = 'http://';
        }
        return protocol;
    }

    get_url_body(url) {
        let domain;
        if (url.includes('://')) {
            domain = url.split('://')[1];
        } else {
            domain = url;
        }
        if (domain.startsWith('www.')) {
            domain = domain.substring(4);
        }
        if (domain.includes('/')) {
            domain = domain.split('/')[0];
        }
        return domain;
    }

    simple_url(url) {
        let hostname;
        if (url.includes('://')) {
            hostname = url.split('://')[1].split('/')[0];
        } else {
            hostname = url;
        }
        if (hostname.startsWith('www.')) {
            hostname = hostname.substring(4);
        }
        const tld_parts = hostname.split('.').slice(-2);
        const tld = tld_parts.join('.');
        return tld;
    }

    joinURL(base, path) {
        const baseURL = new URL(base);
        return new URL(path, baseURL).toString();
    }

    unescape_url(url) {
        const unescapedURL = querystring.unescape(url);
        return unescapedURL
    }

    getDefaultDownloadFileDir(url) {
        let filename = this.getSaveFilename(url)
        let temp_dir = winapiCase.getDownloadsDir(`.deskmanager_temp`)
        filename = path.join(temp_dir, filename)
        return filename
    }

    getSaveFilename(url) {
        const possibleFilename = url.split('/').pop();
        const invalidCharacters = /[<>:"/\\|?*\x00-\x1F]/g;
        const safeFilename = possibleFilename.replace(invalidCharacters, '_');
        return safeFilename;
    }

    async getFileAndUnzip(url, out, callback, force, del = true) {
        let downloadFileName = this.getSaveFilename(url)
        downloadFileName = this.getDefaultDownloadFileDir(url)
        if (force) {
            if (fileCase.isFile(downloadFileName)) {
                fileCase.delete(downloadFileName)
            }
        }
        if (!out) out = downloadFileName
        this.get_file(url, downloadFileName).then((result) => {
            let dest = result.dest
            if (result.dest) {
                zipCase.putUnZipTask(
                    dest,
                    out,
                    (usetime) => {
                        result.usetime += usetime
                        if (del) fileCase.delete(result.dest)
                        if (callback) callback(dest, out, result.usetime)
                    }
                )
            } else {
                if (callback) callback(null, null, result.usetime)
            }
        })
    }

    async getFileAndUnzipOne(url, out, callback, force = true) {
        let key = `http.downloadandunziponece`
        if (!winapiCase.hasListUserData(key, url) && fileCase.isFile()) {
            this.getFileAndUnzip(url, out, (downloadfile, usetime) => {
                winapiCase.addListUserData(key, url)
                if (callback) callback(downloadfile, usetime)
            }, force)
        } else {

        }
        winapiCase.hasAndAddListUserData(url)
    }

    checkPort(port) {
        return new Promise((resolve, reject) => {
            const tester = net.createServer();
            tester.once('error', (err) => {
                if (err.code === 'EADDRINUSE') {
                    tester.close(() => () => {
                        return this.checkPort(port + 1).then(resolve)
                    });
                } else {
                    reject(err);
                    resolve(null);
                }
            });

            tester.once('listening', () => {
                tester.close(() => resolve(port));
            });

            tester.listen(port);
        });
    }

    getServerPort() {
        return this.startPort
    }

    getServerUrl() {
        let port = this.getServerPort()
        return `http://localhost:${port}`
    }

    openServerUrl() {
        let url = this.getServerUrl()
        shell.openExternal(url);
    }

    startHTTPServer(startPort) {
        const COMPILE_PATH = path.join(__dirname, '../../static/html_compile');
        const STATIC_PATH = path.join(__dirname, '../../static');
        const CORE_PATH = path.join(__dirname, '../../core');
        this.expressApp = express();
        this.expressApp.use(express.static(COMPILE_PATH));
        this.expressApp.use(express.static(STATIC_PATH));
        this.expressApp.use(express.static(CORE_PATH));
        this.expressApp.use(bodyParser.json());

        this.expressApp.use((req, res, next) => {
            res.on('finish', () => {
                if (!res.get('Content-Type')) {
                    console.warn(`No Content-Type set for response of ${req.method} ${req.path}`);
                }
            });
            next();
        });

        this.expressApp.all('/event', (req, res) => {
            let data = req.body || req.query;
            if (data && data.event_name) {
                let func = this.encyclopediaOfFunctions[data.event_name];
                if (func && typeof func === 'function') {
                    try {
                        func(data);
                        res.send({ status: 'success', message: 'Event processed successfully' });
                    } catch (error) {
                        res.status(500).send({ status: 'error', message: error.message });
                    }
                } else {
                    res.status(404).send({ status: 'error', message: 'Function not found' });
                }
            } else {
                res.status(400).send({ status: 'error', message: 'Invalid data' });
            }
        });

        expressWs(this.expressApp);
        this.expressApp.ws('/ws', (ws, req) => {
            this.connectedWebSockets.push(ws);
            ws.on('message', (data) => {
                data = JSON.parse(data)
                let wsClientFingerprint = data.wsClientFingerprint
                this.setWSClientWebsocketById(wsClientFingerprint, ws)
                this.event.specifiedCall(data)

            });
            ws.on('close', () => {
                this.remoteWSClientWebsocketByWS(ws)
                const index = this.connectedWebSockets.indexOf(ws);
                if (index !== -1) {
                    this.connectedWebSockets.splice(index, 1);
                }
                console.log('WebSocket closed');
            });
            console.log('WebSocket connected');
        });
        this.expressApp.listen(startPort, () => {
            console.log(`Server is running on http://localhost:${startPort}`);
        });
    }

    listenSocketEvent(data) {
        if (typeof data == 'string') data = JSON.parse(data)
        let args = data.args ? data.args : []
        this.event.specifiedCall(data, args)
    }

    sendToAllWebSockets(message) {
        if (typeof message == 'object') message = JSON.stringify(message)
        for (const ws of this.connectedWebSockets) {
            try {
                ws.send(message);
            } catch (e) {
                console.log(`sendToAllWebSockets`)
                console.log(message)
                console.log(typeof message)
                console.log(e)
            }
        }
    }

    remoteWSClientWebsocketByWS(obj, ws) {
        for (const key in this.getClienWebcketsData) {
            if (this.getClienWebcketsData[key] === ws) {
                delete this.getClienWebcketsData[key];
                return true;
            }
        }
        return null;
    }


    setWSClientWebsocketById(wsCId, ws) {
        this.getClienWebcketsData[wsCId] = ws
    }

    getWSClientWebsocketById(wsCId) {
        if (this.getClienWebcketsData[wsCId]) {
            return this.getClienWebcketsData[wsCId];
        }
        return null;
    }

    sendToWebSockets(message, wsClientFingerprint) {
        let ws = this.getWSClientWebsocketById(wsClientFingerprint)
        if (ws) {
            if (typeof message == 'object') message = JSON.stringify(message)
            try {
                ws.send(message);
            } catch (e) {
                console.log(`message`)
                console.log(message)
                console.log(typeof message)
                console.log(e)
            }
        }
    }

    checkAndStartServer(port) {
        port = port ? port : this.startPort
        this.checkPort(port)
            .then((freePort) => {
                console.log(`freePort ${freePort}`)
                this.startHTTPServer(freePort)
            })
            .catch((error) => {
                console.error('Error while checking ports:', error);
            });
    }

}

module.exports = new HttpCase()



