# 'use strict';
# const { PageInterface } = require('../../../interface/modus/page_interface');
# const options = require('../../../provider/options');
# const Util = require('../../../provider/util')

# class Page extends PageInterface {
#     browser
#     options = {}

#     async init(browser) {
#         this.activePage = null;
#         this.options = options.initConfig()
#         this.browser = browser
#         this.browser.on('targetchanged', async (target) => {
#             const page = await target.page();
#             if (page && target.type() === 'page') {
#                 page.once('focus', () => {
#                     this.activePage = page;
#                 });
#             }
#         });
#         const methods = Object.getOwnPropertyNames(Page.prototype)
#             .filter(name => typeof Page.prototype[name] === 'function' && name !== 'constructor');
#         console.log('Total Page of methods:', methods.length);
#         return this.getPages()
#     }

#     // 获取当前页面的截图
# }

# Page.toString = () => '[class Page]';
# module.exports = Page;

# 根据以上注释的内容,完成该Puppeteer的Page类,.


'use strict';

const { PageInterface } = require('../../../interface/modus/page_interface');

const options = require('../../../provider/options');

const Util = require('../../../provider/util')



class Page extends PageInterface {
    /**
     * @param {Page} browser - The browser instance.
     */
    constructor(browser) {
        super();
        this.browser = browser;
    }
    
    options = {}

    /**
     * 初始化方法，用于获取当前页面的截图.
     * @returns {Promise<Array<Page>>} 所有页面的数组.
     */
    async init() {
        this.activePage = null;
        this.options = options.initConfig();
        this.browser = this.browser || await this.getBrowser();
        this.browser.on('targetchanged', async (target) => {
            const page = await target.page();
            if (page && target.type() === 'page') {
                page.once('focus', () => {
                    this.activePage = page;
                });
            }
        });
        const methods = Object.getOwnPropertyNames(Page.prototype)
            .filter(name => typeof Page.prototype[name] === 'function' && name !== 'constructor');
        console.log('Total Page of methods:', methods.length);
        return this.getPages();
    }
    
    /**
     * 获取当前页面的截图.
     * @returns {Promise<Buffer>} 截图的Buffer数据.
     */
    async getScreenshot() {
        const page = this.activePage || (await this.init())[0];
        if (page) {
            return await page.screenshot();
        }
        return null;
    }
    
    /**
     * 获取当前页面的HTML源码.
     * @returns {Promise<string>} 页面的HTML源码.
     */
    async getHtml() {
        const page = this.activePage || (await this.init())[0];
        if (page) {
            return await page.content();
        }
        return null;
    }
    
    /**
     * 关闭页面.
     */
    async close() {
        const pages = await this.getPages();
        if (pages.length > 0) {
            await pages[0].close();
        }
    }
    
    /**
     * 获取所有打开的页面.
     * @returns {Promise<Array<Page>>} 所有页面的数组.
     */
    async getPages() {
        return (await this.browser.pages());
    }
    
    /**
     * 获取当前页面的浏览器.
     * @returns {Promise<Browser>} 当前页面的浏览器实例.
     */
    async getBrowser() {
        return (await this.getPages())[0].browser();
    }
    
    // 获取当前页面的截图
}
Page.toString = () => '[class Page]';
module.exports = Page;