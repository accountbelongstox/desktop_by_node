'use strict';

const { Service } = require('ee-core');
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * 示例服务（service层为单例）
 * @class
 */
class ZipinstallService extends Service {

    constructor(ctx) {
        super(ctx);
    }

    /**
     * 下载并解压文件
     * @param {string} softwareFileName
     */
    async downloadAndUnzip(softwareFileName) {
        const remoteServerUrl = 'http://nas.static.local.12gm.com:900/';
        const remoteFileUrl = `${remoteServerUrl}applications/${softwareFileName}`;
        const localFilePath = `D:/applications_bak/${softwareFileName}`;
        const unzipPath = 'D:/applications';

        try {
            const response = await axios({
                method: 'get',
                url: remoteFileUrl,
                responseType: 'arraybuffer',
            });

            fs.writeFileSync(localFilePath, response.data);

            exec(`7z.exe x "${localFilePath}" -o"${unzipPath}" -y`, (error, stdout, stderr) => {
                if (error) {
                    console.error('解压文件时发生错误:', stderr);
                } else {
                    fs.unlinkSync(localFilePath);
                    console.log('文件下载并解压完成.');
                }
            });
        } catch (error) {
            console.error('下载或解压文件时发生错误:', error);
        }
    }
}

ZipinstallService.toString = () => '[class ZipinstallService]';
module.exports = ZipinstallService;



