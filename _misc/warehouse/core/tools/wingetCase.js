const { exec, execSync } = require('child_process');
const messageCase = require("./messageCase.js");
const stringCase = require("./stringCase.js");
const path = require('path');
const utilCase = require('./utilCase.js');
const fileCase = require('./fileCase.js');
const httpCase = require('./httpCase.js');
const zipCase = require('./zipCase.js');
const shortcutIconCase = require('./shortcutIconCase.js');
const winapiCase = require('./winapiCase.js');
const htmlCase = require('./htmlCase.js');

class Winget {

    install_queue = []
    must_softs = []
    timers = {}

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }

    search(query) {
        return new Promise((resolve, reject) => {
            exec(`winget search ${query}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        }).catch(() => { })
    }

    startInstallProgress(secondsPassed = 0, maxProgress = 100, aid) {
        let imgid = aid.substring(1)
        if (this.timers[aid]) {
            clearInterval(this.timers[aid]);
            this.timers[aid] = null
        }
        this.timers[aid] = setInterval(() => {
            let install_fail = (secondsPassed + maxProgress) == 0
            if (secondsPassed >= maxProgress || install_fail) {
                clearInterval(this.timers[aid]);
            }
            if (install_fail) {
                this.updateInstallProgressToHTML(secondsPassed, aid, imgid, true)
            }
            secondsPassed++;
            this.updateInstallProgressToHTML(secondsPassed, aid, imgid)
        }, 500);
    }

    updateInstallProgressToHTML(secondsPassed, aid, imgid, claer = false) {
        if (!imgid) imgid = aid.substring(1)
        let radius = parseInt(this.config_base.icon_width / 2)
        let innerRadius = radius - 4
        let remain_per = 100 - secondsPassed
        let success = secondsPassed >= 100 ? true : false
        if (remain_per < 0) remain_per = 0
        let pid = `progress_bar_cover_${aid}`
        let progress_bar_html = `
            <div id="${pid}" class='install-prograse-css'>
                <span class="${aid}" data-peity='{ "fill": ["none", "rgba(255,255, 255, 0.6)"], "radius": ${radius} }'>0,0</span>
            </div>
        `
        let shaking_act = 'remove'
        if (secondsPassed % 2 == 0) {
            shaking_act = 'add'
        }
        let grayscale = `30`
        if (success) {
            grayscale = `0`
            shaking_act = 'remove'
            progress_bar_html = ``
        }
        let peity_code = `$('#${pid} .${aid}').peity('pie');`
        if (claer) {
            progress_bar_html = ``
            shaking_act = 'remove'
            grayscale = `100`
            peity_code = ``
        } else {

        }
        htmlCase.addHTMLToInnerBeforeOne(`#aid_container_${aid}`,progress_bar_html,`#${pid}`)
        let js_code = `
            (()=>{
                let imgid = document.querySelector('#${imgid}');
                let aid = document.querySelector('#${aid}');
                let pid = document.querySelector('#${pid} .${aid}');
                if(imgid){
                    imgid.style.filter = 'grayscale(${grayscale}%)'
                }else{
                    console.log('updateInstallProgressToHTML imgid: #${imgid} not found')
                }
                if(pid){
                    pid.innerText = '${secondsPassed},${remain_per}'
                }else{
                    console.log('updateInstallProgressToHTML pid: #${pid} not found')
                }
                
                ${peity_code}
            })()
        `
        htmlCase.exejs(js_code)
        if(claer || success){
            htmlCase.removeElement(`#${pid}`)
        }
    }

    install(package_id, name) {
        let config = this.event.get_config()
        let soft_localpath = stringCase.to_windowspath(path.join(config.soft_localpath, name))
        let cmd = `winget install --id "${package_id}" -s "winget" --accept-package-agreements --location "${soft_localpath}" --silent`
        this.install_queue.push({
            id: package_id,
            command: cmd
        })
        this.exec_install()
    }

    installById(package_id, name, silent, callback) {
        this.isInstalled(package_id).then((isInstalled) => {
            if (!isInstalled) {
                let imgid = stringCase.get_id(name)
                let aid = `a` + imgid
                let config = this.event.get_config()
                this.startInstallProgress(0, 98, aid)
                messageCase.success(`install starting`)
                let soft_localpath = stringCase.to_windowspath(path.join(config.soft_localpath, name))
                // let cmd = `winget install --id "${package_id}" -s "winget" --accept-package-agreements --location "${soft_localpath}" --silent`
                let cmd = `winget install --id "${package_id}"`
                if (silent) {
                    cmd += ` --accept-package-agreements --location "${soft_localpath}" --silent`
                }
                fileCase.mkdir(soft_localpath)
                this.install_queue.push({
                    id: package_id,
                    command: cmd,
                    aid,
                    callback
                })
                this.exec_install()
            }
        }).catch(e => { })
    }

    installByConfig(installConfig, group_name, callback) {
        let config = this.event.get_config()
        let soft_install_path = config.soft_localpath

        let { basename, winget_id, soruce_url, default_dir } = installConfig
        if (winget_id) {
            this.isInstalled(winget_id).then((isInstalled) => {
                if (!isInstalled) {
                    this.installById(winget_id, basename, true, async (isSuccess) => {
                        if (isSuccess) {
                            this.event.success(`${winget_id} installed success!`)
                            if (callback) callback(true)
                        } else {
                            if (soruce_url) {
                                let downloadFile = await httpCase.download(soruce_url)
                                if (default_dir) {
                                    fileCase.symlink(path.join(soft_install_path, basename), path.join(default_dir, basename), true)
                                }
                                winapiCase.exec_asadmin(downloadFile)
                                if (callback) callback(true)
                            } else {
                                if (callback) callback(false)
                            }
                        }
                    });
                } else {
                    console.log(`winget_id ${winget_id} is already installed`)
                    if (callback) callback(true)
                }
            }).catch(() => { })
        } else {
            let config = this.event.get_config()
            let remote_update_url = config.setting_soft_remote_update_url
            if (remote_update_url.startsWith('\\\\')) {
                this.installByConfigProgress(installConfig, group_name, callback, `NetwordShare`)
            } else if (remote_update_url.startsWith('http://') || remote_update_url.startsWith('https://')) {

                this.installByConfigProgress(installConfig, group_name, callback, `HttpDownload`)
            } else if (remote_update_url.startsWith('ftp://')) {
                if (callback) callback(false)
            } else {
                if (callback) callback(false)
            }
        }
    }

    async installByConfigProgress(installConfig, group_name, callback, remoteType = 'NetwordShare') {
        let install_key = `install.installedSoftFolders`
        let { target, basename, soruce_url, default_dir, iconPath,iconBase64 } = installConfig
        let config = this.event.get_config()
        let remote_url = config.setting_soft_remote_update_url
        let install_path = config.soft_localpath
        let Drive = fileCase.getDrive(install_path)
        let aid = `a` + stringCase.get_id(basename)
        if (!fileCase.isFile(target)) {

            let soft_basefolder = fileCase.getLevelPath(target, 0, 2)
            if (winapiCase.hasListUserData(install_key, soft_basefolder)) {
                shortcutIconCase.updateIconToHTML(group_name, basename, target)
                if (callback) return callback(true)
                return
            }
            fileCase.mkdir(install_path)
            let base_path = fileCase.slicePathLevels(target, 2)
            let soft_basename = path.basename(base_path)
            let zip_name = `${soft_basename}.zip`
            this.startInstallProgress(0, 50, aid)

            let target_zipname = path.join(Drive + ':/.temp/applications', zip_name)

            let zip_network_path
            if (remoteType == 'NetwordShare') {
                zip_network_path = fileCase.getNetworkPath(remote_url, `applications/${zip_name}`)
                this.installProgressInfo(basename, target, zip_network_path, target_zipname, base_path)
                fileCase.putCopyTask(zip_network_path, target_zipname, null,
                    (destination, success, timeDifference) => {
                        this.unzipAndinstall(aid, destination, install_path, success, group_name, basename, target, target_zipname, install_key, soft_basefolder, callback)
                    })

            } else if (remoteType == 'HttpDownload') {
                zip_network_path = httpCase.joinURL(remote_url, `applications/${zip_name}`)
                this.installProgressInfo(basename, target, zip_network_path, target_zipname, base_path)
                httpCase.get_file(zip_network_path, target_zipname).then((result) => {
                    let destination = result.dest
                    let success = result.success
                    this.unzipAndinstall(aid, destination, install_path, success, group_name, basename, target, target_zipname, install_key, soft_basefolder, callback)
                })
            }

        } else {
            shortcutIconCase.updateIconToHTML(group_name, basename, target)
            console.log(`basename ${basename} is already installed`)
            if (callback) callback(true)
        }
    }

    installProgressInfo(basename, target, zip_network_path, target_zipname, base_path) {
        console.log(`Installing ${basename} Infoa:`)
        console.log(`\ttarget: ${target}`)
        console.log(`\tzip_network_path: ${zip_network_path}`)
        console.log(`\ttarget_zipname: ${target_zipname}`)
        console.log(`\tbase_path: ${base_path}`)
    }

    unzipAndinstall(aid, destination, install_path, success, group_name, basename, target, target_zipname, install_key, soft_basefolder, callback) {
        this.startInstallProgress(50, 95, aid)
        console.log(`install copyed:`)
        console.log(`\tdestination: ${destination}`)
        console.log(`\tsuccess: ${success}`)
        console.log(`\tinstall_path: ${install_path}`)
        if (destination && success) {
            try {
                zipCase.putUnZipTask(destination, install_path, () => {
                    this.startInstallProgress(95, 99, aid)
                    console.log(`Start to update the icon to the interface by :`)
                    console.log(`\ttarget: ${target}`)
                    // shortcutIconCase.updateIconToHTML(group_name, basename, target)
                    fileCase.delete(target_zipname)
                    this.startInstallProgress(99, 100, aid)
                    winapiCase.addListUserData(install_key, soft_basefolder)
                    if (callback) callback(true)
                })
            } catch (e) {
                console.log(e)
                if (callback) callback(false)
            }
        } else {
            this.startInstallProgress(0, 0, aid)
            if (callback) callback(false)
        }
    }


    exec_install() {
        if (this.install_queue.length == 0) {
            return
        }
        let { id, command, aid, callback } = this.install_queue.shift()
        let startTime = new Date();
        exec(command, (error, stdout, stderr) => {
            let isSuccess = false
            if (error) {
                messageCase.success(`Error: ${error.message}`);
            } else if (stderr) {
                messageCase.success(`StdError: ${stderr.toString()}`);
            }
            if (stdout) {
                console.log(stdout)
                if (stdout.includes("Successfully installed")) {
                    isSuccess = true
                }
            }
            const timeDifference = new Date() - startTime; // 计算时间间隔
            messageCase.success(`${id} installed success. ${timeDifference}s`)
            this.startInstallProgress(98, 101, aid)
            if (callback) callback(isSuccess)
            this.exec_install()
        });

    }

    uninstall(packageId) {
        return new Promise((resolve, reject) => {
            exec(`winget uninstall ${packageId}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        }).catch(() => { })
    }

    isInstalled(packageId) {
        return new Promise((resolve, reject) => {
            exec(`winget list`, (error, stdout, stderr) => {
                let success = false
                if (stdout.includes(packageId)) {
                    success = true
                }
                if (error) {
                    reject(false)
                }
                resolve(success);
            });
        }).catch(() => { })
    }

    queryInstalled(packageIds) {
        return new Promise((resolve, reject) => {
            exec(`winget list`, (error, stdout, stderr) => {
                let unInstalled = []
                packageIds.forEach((packageId) => {
                    if (!stdout.includes(packageId)) {
                        unInstalled.push(packageId)
                    }
                })
                if (error) {
                    reject(unInstalled)
                }
                resolve(unInstalled);
            });
        }).catch(() => { })
    }

    setInstallPath(path) {
        // Winget CLI 不直接支持设置安装路径，但你可以尝试使用其他工具或手动设置它。
        // 这个方法仅作为一个示例。
        console.log(`Setting install path is not directly supported by winget CLI.`);
    }

    query_exe(targetFolderPath) {
        const installExePath = path.join(targetFolderPath, 'install.exe');
        // 如果 install.exe 存在，则返回该文件路径
        if (fs.existsSync(installExePath)) {
            return installExePath;
        }
        const misFiles = fs.readdirSync(targetFolderPath).filter(file => path.extname(file) === '.msi');
        if (misFiles.length > 0) {
            return misFiles[0]
        }
        // 否则查找包含 install 的 exe 文件
        const exeFiles = fs.readdirSync(targetFolderPath).filter(file => path.extname(file) === '.exe');
        if (exeFiles.length === 1) {
            // 如果目录下只有一个 exe 文件，则直接返回该文件路径
            return path.join(targetFolderPath, exeFiles[0]);
        } else if (exeFiles.length > 1) {
            // 如果目录下有多个 exe 文件，则返回体积最大的
            let maxSize = -1;
            let maxFile = '';
            for (const file of exeFiles) {
                const filePath = path.join(targetFolderPath, file);
                const stat = fs.statSync(filePath);

                if (stat.isFile() && stat.size > maxSize) {
                    maxSize = stat.size;
                    maxFile = filePath;
                }
            }
            return maxFile;
        } else {
            // 如果都没有找到，则返回该目录下的唯一一个文件
            const files = fs.readdirSync(targetFolderPath);

            if (files.length === 1) {
                return path.join(targetFolderPath, files[0]);
            } else {
                return null
            }
        }
    }

    createInstallIconChart(aid,src,percent,w,h,){
        if(!w)w = this.config_base.icon_width
        if(!h)h = this.config_base.icon_height
        let cw = w
        let ch = h
        let r = 100
        let cx = 100
        let cy = 100
        let imgId = stringCase.create_id(src)
        let html = `
        <div id="install_${imgId}">
            <figure id="selft-pie2" style="position:relative;width:${w}px;height:${h}px;"><svg xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    style="width:100%;height:100%;-webkit-transform: rotate(-90deg);transform: rotate(-90deg);overflow:visible;">
                    <circle r="${r}" cx="${cx}" cy="${cy}" style="fill:rgb(26, 188, 156,0);"></circle>
                    <circle r="50.5" cx="100" cy="100"
                        style="fill: rgba(26, 188, 156, 0); stroke: url(&quot;#${imgId}&quot;); stroke-width:${cw}px; stroke-dasharray: ${percent}px, 316.673px;">
                    </circle>
                </svg>
            </figure>
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <pattern id="${imgId}" x="0" y="0" width="1" height="1" viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid slice">
                        <image width="100" height="100" xlink:href="${src}"></image>
                    </pattern>
                </defs>
                <!-- 使用模式填充圆形 -->
                <circle cx="100" style="display: none;" cy="100" r="50" fill="url(#${imgId})"></circle>
            </svg>
        </div>
        `
        htmlCase.addHTMLToInnerAfter(`.aid_container_${aid}`,html)
    }

    installBybasename(){

    }
    
}

module.exports = new Winget()

