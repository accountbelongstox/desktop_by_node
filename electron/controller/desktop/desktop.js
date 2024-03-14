'use strict';
const { Controller } = require('ee-core');
const fs = require('fs');
// const Ps = require('ee-core/ps');
const Services = require('ee-core/services');
const { file, json, httptool } = require('../../../dd_electron/node_provider/utils.js');
const { shoticon, softinstall, win } = require('../../../dd_electron/node_provider/practicals.js');
const { gdir } = require('../../../dd_electron/node_provider/globalvars.js');

class DesktopController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async getSfotlist() {
        const SoftlistServer = await Services.get('desktop.softlist');
        let localSoftlistCache = shoticon.readLocalSoftlistJSON()
        let localIconCache = shoticon.readLocalIconJSON()

        if (
            !localSoftlistCache
            ||
            (localSoftlistCache && localSoftlistCache.length == 0)
        ) {
            localSoftlistCache = await SoftlistServer.getSoftlistFromApiV2()
            shoticon.saveLocalSoftlistJSON(localSoftlistCache)
        } else {
            const withoutHour = shoticon.isLocalIconJSONModifiedWithoutHour()
            if (withoutHour) {
                let remoteIconCache = await SoftlistServer.getSoftlistFromApiV2()
                localSoftlistCache = shoticon.mergeIconJson(localSoftlistCache, remoteIconCache)
                shoticon.saveLocalSoftlistJSON(localSoftlistCache)
            }
        }

        if (!localIconCache) {
            localIconCache = await SoftlistServer.getIconsFromApiV2()
            shoticon.saveLocalIconJSON(localIconCache)
        }
        localSoftlistCache = shoticon.addIconToCacheJSON(localSoftlistCache, localIconCache)
        localSoftlistCache = shoticon.createIdByIconsJSON(localSoftlistCache)
        localSoftlistCache = shoticon.createIconFile(localSoftlistCache)
        localSoftlistCache = shoticon.checkIconFileIsExists(localSoftlistCache)
        // shoticon.generateIconShortcut(localSoftlistCache)
        return localSoftlistCache
    }

    startInstallProgress(secondsPassed = 0, stageProgress = 10, aid, maxProgress = 100, status = true, step = 1) {
        if (!this.installProgressTimers[aid]) {
            this.installProgressTimers[aid] = {
                status: true
            }
        }
        this.installProgressTimers[aid].secondsPassed = secondsPassed
        this.installProgressTimers[aid].maxProgress = maxProgress
        this.installProgressTimers[aid].stageProgress = stageProgress
        if (this.installProgressTimers[aid].status) {
            this.installProgressTimers[aid].status = status
        }
        if (!this.installProgressTimers[aid].imgid) {
            this.installProgressTimers[aid].imgid = shortcutIconWidget.genImagIdByAid(aid)
        }
        if (!this.installProgressTimers[aid].timer) {
            this.installProgressTimers[aid].timer = setInterval(() => {
                let processObj = this.installProgressTimers[aid]
                let secondsPassed = processObj.secondsPassed
                let maxProgress = processObj.maxProgress
                let stageProgress = processObj.stageProgress
                let status = processObj.status
                let imgid = processObj.imgid
                let claer = !status
                let stop = secondsPassed >= maxProgress || !status

                console.log(`secondsPassed , stageProgress , status , claer , stop`)
                console.log(secondsPassed, stageProgress, status, claer, stop)
                if (stop) {
                    httptool.sendToWebSocket(`public:removeInstallProgress`, {
                        secondsPassed, aid, imgid, claer
                    })
                    clearInterval(this.installProgressTimers[aid].timer);
                    this.installProgressTimers[aid] = null
                } else {
                    if (secondsPassed < stageProgress) {
                        let claer = !status
                        secondsPassed += step;
                        this.installProgressTimers[aid].secondsPassed = secondsPassed
                        httptool.sendToWebSocket(`public:updateInstallProgress`, {
                            secondsPassed, aid, imgid, claer
                        })
                    } else {
                        this.installProgressTimers[aid].secondsPassed = stageProgress
                    }
                }
            }, 500);
        }
    }

    addInstallProgress(addValue, maxValue, aid) {
        let processObj = this.installProgressTimers[aid]
        let secondsPassed
        if (processObj) {
            secondsPassed = this.installProgressTimers[aid].secondsPassed + addValue
        }
        if (maxValue > secondsPassed) {
            this.startInstallProgress(secondsPassed, maxValue, aid)
        }
    }

    startProgress(secondsPassed = 0, stageProgress = 10, aid, msg = '', maxProgress = 100, status = true, step = 1) {
        aid = stringUnit.create_id(aid)
        if (!this.progressTimers[aid]) {
            this.progressTimers[aid] = {
                status: true
            }
        }
        this.progressTimers[aid].secondsPassed = secondsPassed
        this.progressTimers[aid].maxProgress = maxProgress
        this.progressTimers[aid].stageProgress = stageProgress
        if (this.progressTimers[aid].status) {
            this.progressTimers[aid].status = status
        }
        if (!this.progressTimers[aid].imgid) {
            this.progressTimers[aid].imgid = shortcutIconWidget.genImagIdByAid(aid)
        }
        if (!this.progressTimers[aid].timer) {
            this.progressTimers[aid].timer = setInterval(() => {
                let processObj = this.progressTimers[aid]
                let secondsPassed = processObj.secondsPassed
                let maxProgress = processObj.maxProgress
                let stageProgress = processObj.stageProgress
                let status = processObj.status
                let imgid = processObj.imgid
                let claer = !status
                let stop = secondsPassed >= maxProgress || !status

                console.log(`secondsPassed , stageProgress , status , claer , stop`)
                console.log(secondsPassed, stageProgress, status, claer, stop)
                if (stop) {
                    httptool.sendToWebSocket(`public:removeInstallProgress`, {
                        secondsPassed, aid, imgid, claer, maxProgress, msg
                    })
                    clearInterval(this.progressTimers[aid].timer);
                    this.progressTimers[aid] = null
                } else {
                    if (secondsPassed < stageProgress) {
                        let claer = !status
                        secondsPassed += step;
                        this.progressTimers[aid].secondsPassed = secondsPassed
                        httptool.sendToWebSocket(`public:addProgress`, {
                            secondsPassed, aid, imgid, claer, maxProgress, msg
                        })
                    } else {
                        this.progressTimers[aid].secondsPassed = stageProgress
                    }
                }
            }, 1000);
        }
    }

    addProgress(addValue, maxValue, aid) {
        aid = stringUnit.create_id(aid)
        let processObj = this.progressTimers[aid]
        let secondsPassed
        if (processObj) {
            secondsPassed = this.progressTimers[aid].secondsPassed + addValue
        }
        if (maxValue > secondsPassed) {
            this.startProgress(secondsPassed, maxValue, aid)
        }
    }

    set_htmlviewdragableregion() {
        let htmlviewdragableregion = {
            dragable: {
                style: "-webkit-app-region: drag;",
                selectors: [".soft-title"]
            },
            disdrag: {
                style: "-webkit-app-region: no-drag;",
                selectors: ['.soft-control-window']
            },
            select: {
                style: "-webkit-user-select: text;",
                selectors: []
            },
            nonselect: {
                style: "-webkit-user-select: none;",
                selectors: ["body"]
            }
        }
    }

    async getBackgroundByNetwork() {
        let imagePath = gdir.getLocalFile(`/wallpaper/temp_img.png`)
        if (!file.isFile(imagePath) || file.isModifiedYesterday(imagePath)) {
            const bing_main_url = `https://cn.bing.com`
            const bing_url = `${bing_main_url}/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN`
            let data = await httptool.getJSON(bing_url)
            let url = data.images[0].url.replaceAll('_1920x1080', '_UHD')
            let bing_image_url = bing_main_url + url
            let imageBase64 = await httptool.readRemoteImage(bing_image_url)
            fs.writeFileSync(imagePath, Buffer.from(imageBase64, 'base64'));
        }
        return {
            base64Img: file.readBase64ByFile(imagePath)
        }
    }

    pie(id, pie_outlook, pie_background, w, h) {
        html = `
        <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <pattern id="${id}_pie_outlook" x="0" y="0" width="1" height="1" viewBox="0 0 ${w} ${w}" preserveAspectRatio="xMidYMid slice">
                    <image width="${w}" height="${h}" xlink:href="${pie_outlook}"></image>
                </pattern>
            </defs>
        </svg>
        <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <pattern id="${id}_pie_background" x="0" y="0" width="1" height="1" viewBox="0 0 ${w} ${w}" preserveAspectRatio="xMidYMid slice">
                    <image width="${w}" height="${h}" xlink:href="${pie_background}"></image>
                </pattern>
            </defs>
        </svg>
        <figure id="selft-pie2" style="position:relative;width:200px;height:200px;">
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;-webkit-transform: rotate(-90deg);transform: rotate(-90deg);overflow:visible;">
            <circle r="100" cx="${w}" cy="${w}" style="fill:url(#pie_outlook);"></circle>
            <circle r="50.5" cx="${w}" cy="${w}" style="fill: rgb(26, 188, 156,0);stroke:url(#pie_background);;stroke-width: ${w}px;stroke-dasharray: 161.503px, 316.673px;"></circle>
        </svg>
	    </figure>
        `
        return html
    }

    getSoftwareIcons() {
        return sServer.getSoftwareIcons();
    }

    getSoftwareList() {
        return sServer.getSoftwareList();
    }

    compareJSON(objA, objB) {
        return sServer.compareJSON(objA, objB);
    }

    mergeJSON(objA, objB) {
        return sServer.mergeJSON(objA, objB);
    }

    readLocalSoftwareGroups() {
        return sServer.readLocalSoftwareGroups();
    }

    async readAndUpdateLocalSoftwareIcons() {
        return sServer.readAndUpdateLocalSoftwareIcons();
    }

    async updateLocalSoftwareGroups() {
        return sServer.updateLocalSoftwareGroups();
    }

    parseSoftwareGroups(mergedSoftwareGroups) {
        return sServer.parseSoftwareGroups(mergedSoftwareGroups);
    }

    async downloadFile(url) {
        return sServer.downloadFile(url);
    }

    async executeSoftware(software) {
        return sServer.executeSoftware(software);
    }

    async installSoftware(software) {

        return softinstall.addInstallQueue(software);
    }

    async installWithWinget(software) {
        return sServer.installWithWinget(software);
    }

    async installByUnpacking(software) {
        return sServer.installByUnpacking(software);
    }

    runSoftware(software) {
        let event_name = `opensoft`
        return win.runAsAdmin(software.target, (openResult) => {
            httptool.eggSocket(event_name, {
                type: 'open',
                openResult,
                ...software
            })
        });
    }

    async backupSoftware(software) {
        return sServer.backupSoftware(software);
    }
}

DesktopController.toString = () => '[class DesktopController]';
module.exports = DesktopController;
