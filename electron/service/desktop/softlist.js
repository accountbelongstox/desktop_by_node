'use strict';
const { Service } = require('ee-core');
const Log = require('ee-core/log');
const Ps = require('ee-core/ps');
const HttpClient = require('ee-core/httpclient');
const {gdir} = require('../../../dd_electron/node_provider/globalvars.js');
const {strtool} = require('../../../dd_electron/node_provider/utils.js');


class SoftlistService extends Service {

    constructor(ctx) {
        super(ctx);
    }

    async getSoftlistFromApi() {
        const res = [];
        const staticApiUrl = await gdir.getLocalStaticApiTestUrl()
        try {
            const hc = new HttpClient();
            const softlistApiUrl = staticApiUrl + `softlist/static_src/software_config/soft_group.json`
            const iconsApiUrl = staticApiUrl + `softlist/static_src/software_config/soft_icons.json`
            const response = await hc.request(softlistApiUrl, {
                method: 'GET',
                dataType: 'json',
                timeout: 15000,
            });
            const result = response.data;
            if (Ps.isDev()) {
                Log.info('[getSoftlistFromApi]: info result:%j', strtool.truncate(result));
            }
            if (result.code !== 'success') {
                Log.error('[getSoftlistFromApi]: res error result:%j', strtool.truncate(result));
            }

            let resultIcons = {}
            const responseIcons = await hc.request(iconsApiUrl, {
                method: 'GET',
                dataType: 'json',
                timeout: 15000,
            });
            resultIcons = responseIcons.data;
            if (Ps.isDev()) {
                Log.info('[getSoftlistFromApi]: info result:%j', strtool.truncate(result));
            }
            if (result.code !== 'success') {
                Log.error('[getSoftlistFromApi]: res error result:%j', strtool.truncate(result));
            }
            for (const key in result) {
                const softobjs = result[key]
                for (const softname in softobjs) {
                    const softobj = softobjs[softname]
                    const basename = softobj[`basename`]
                    if (resultIcons[basename] && resultIcons[basename].iconBase64) {
                        softobj.iconBase64 = resultIcons[basename].iconBase64
                    } else {
                        softobj.iconBase64 = ''
                    }
                }
            }
            return result;
        } catch (e) {
            Log.error('[uploadFileToSMMS]:  ERROR ', e);
        }
        return res;
    }

    async getSoftlistFromApiV2() {
        const res = [];
        const staticApiUrl = await gdir.getLocalStaticApiTestUrl()
        try {
            const hc = new HttpClient();
            const softlistApiUrl = staticApiUrl + `softlist/static_src/software_config/soft_group_v2.json`
            const response = await hc.request(softlistApiUrl, {
                method: 'GET',
                dataType: 'json',
                timeout: 15000,
            });
            let result = response.data;
            if (Ps.isDev()) {
                Log.info('[getSoftlistFromApiV2]: info result:%j', strtool.truncate(result));
            }
            if (result.code !== 'success') {
                Log.error('[getSoftlistFromApiV2]: res error result:%j', strtool.truncate(result));
            }
            return result; 
        } catch (e) {
            Log.error('[getSoftlistFromApiV2]:  ERROR ', e);
        }
        return res;
    }

    async getIconsFromApiV2() {
        const hc = new HttpClient();
        const staticApiUrl = await gdir.getLocalStaticApiTestUrl()
        const iconsApiUrl = staticApiUrl + `softlist/static_src/software_config/soft_icons.json`
        const response = await hc.request(iconsApiUrl, {
            method: 'GET',
            dataType: 'json',
            timeout: 15000,
        });
        let result = response.data;
        if (Ps.isDev()) {
            Log.info('[getIconsFromApiV2]: info result:%j', strtool.truncate(result));
        }
        if (result.code !== 'success') {
            Log.error('[getIconsFromApiV2]: res error result:%j', strtool.truncate(result));
        }
        return result;;
    }
}

SoftlistService.toString = () => '[class SoftlistService]';
module.exports = SoftlistService;  