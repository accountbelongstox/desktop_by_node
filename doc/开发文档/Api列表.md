all.init(browser) - 初始化，传入浏览器实例并获取页面。
browser.page.createPage(conf) - 使用给定的配置创建一个新页面。
browser.page.open(url, options) - 打开给定URL，并使用指定选项配置页面。
browser.page.setUserAgent(userAgent, index) - 设置指定页面的用户代理。
browser.page.switch(urlOrIndex) - 切换到给定URL或索引的页面。
browser.page.getCurrentPageIndex() - 获取当前页面的索引。
browser.page.switchToPageByIndex(index) - 通过索引切换到指定页面。
browser.page.switchToPageByUrl(url) - 通过URL切换到指定页面。
browser.page.getPageByIndex(index) - 通过索引获取页面。
browser.page.close(handle) - 关闭给定句柄的窗口。
browser.page.closePage(url, safe) - 安全地关闭指定的URL页面。
browser.page.getCurrentUrl(full) - 获取当前的URL，可选择是否完整。
browser.page.getPagesLen() - 获取页面数量。
browser.page.getPages() - 获取所有页面。
browser.page.findPageIndexByUrl(url) - 通过URL查找页面索引。
browser.page.findPageByUrl(url) - 通过URL查找页面。
browser.page.closePageByIndex(index) - 通过索引关闭页面。
browser.page.closePageByUrl(url) - 通过URL关闭页面。
browser.page.closeBrowserWindow() - 关闭浏览器窗口。
browser.page.quitBrowser() - 退出浏览器。
browser.page.findBlankPageIndex() - 查找空白页的索引。
browser.page.findNormalizedUrlIndex(url) - 查找规范化URL的索引。
browser.page.switchOnly(url) - 切换到给定的URL，如果不存在则打开新页面。
browser.page.getCookies()
browser.page.getPageSize() - 获取浏览器的宽和高。
browser.page.getLocalStorageData()
browser.page.getSessionStorageData()
browser.page.getIndexedDBData()
browser.page.setCookies()
browser.page.setLocalStorageData()
browser.page.setSessionStorageData()
browser.page.setIndexedDBData()

browser.handle.getCurrentPage() - 获取当前页面。
browser.handle.executeJsCode(jsCode) - 在当前页面执行JavaScript代码。
browser.handle.triggerBySelector(selector, action) - 对指定选择器的元素执行操作。
browser.handle.loadJsFileLocal(filePath) - 加载本地JavaScript文件。
browser.handle.loadJsFileRemote(url) - 加载远程JavaScript文件。
browser.handle.returnByJavascript(jsCode) - 执行JavaScript代码并返回结果。
browser.handle.dragAndDropElement(selector, targetX, targetY) - 拖放元素到指定坐标。
browser.handle.setInputBySelector(selector, value) - 设置输入框值。
browser.handle.setSelectValueBySelector(selector, valueOrIndex) - 设置下拉框值。
browser.handle.setCheckboxValueBySelector(selector, valueOrIndex) - 设置复选框值。
browser.handle.setRadioValueBySelector(selector, valueOrIndex) - 设置单选框值。
browser.handle.setElementValueBySelector(selector, valueOrIndex) - 设置元素的值。
browser.handle.getSelectValueBySelector(selector) - 获取下拉框选中值。
browser.handle.getCheckboxValueBySelector(selector) - 获取复选框的值。
browser.handle.getRadioValueBySelector(selector) - 获取单选框的值。
browser.handle.getElementValueBySelector(selector) - 获取元素的值。
browser.handle.getCoordinatesBySelector(selector) - 获取元素的坐标。
browser.handle.executeJsIfElementExists(selector, jsCode) - 如果元素存在，则执行JavaScript代码。
browser.handle.setFocusBySelector(selector) - 将焦点设置到元素。
browser.handle.clickElementBySelector(selector) - 点击元素。
browser.handle.clickElementByInnerText(text) - 根据文字来点击元素
browser.handle.clickElementByXpath(selector) - 点击元素。
browser.handle.removeElementBySelector(selector) - 删除元素。
browser.handle.setInnerHtmlBySelector(selector, html) - 设置元素内部HTML。
browser.handle.insertHtmlBeforeElementBySelector(selector, html) - 在元素之前插入HTML。
browser.handle.insertHtmlAfterElementBySelector(selector, html) - 在元素之后插入HTML。
browser.handle.insertHtmlInsideElementBySelector(selector, html) - 在元素内部插入HTML。
browser.handle.insertHtmlInsideEndOfElementBySelector(selector, html) - 在元素内部的末尾插入HTML。
browser.handle.createAndInsertHtmlElement(htmlString, targetSelector, position, jsToExecute) - 创建并插入HTML元素。
browser.handle.getScrollHeightBySelector(selector) - 获取元素的滚动高度。
browser.handle.scrollToPositionBySelector(selector, position) - 滚动到元素的指定位置。
browser.handle.scrollToBottomBySelector(selector) - 滚动到元素的底部。
browser.handle.horizontalSwipeBySelector(selector, length, direction) - 水平滑动元素。
browser.handle.verticalSwipeBySelector(selector, length, direction) - 垂直滑动元素。

async browser.content.init(browser, page) - 初始化 Content 类，传入浏览器和页面对象
async browser.content.getCurrentPage() - 获取当前页面对象，并返回
async browser.content.getFullPageOuterHTMLAndWait() - 获取完整页面的 HTML，等待页面加载完成后返回
async browser.content.getFullPageOuterHTML() - 获取完整页面的 HTML
async browser.content.getAllAnchorHrefs(completeURL) - 获取页面中所有锚链接的 href 属性值，可选择是否返回完整 URL
async browser.content.getAllImageSrcs(completeURL) - 获取页面中所有图片元素的 src 属性值，可选择是否返回完整 URL
async browser.content.getAllCssResourcePaths(completeURL) - 获取页面中所有 CSS 资源的路径，可选择是否返回完整 URL
async browser.content.getAllJsResourcePaths(completeURL) - 获取页面中所有 JavaScript 资源的路径，可选择是否返回完整 URL
async browser.content.queryAllElements(selector) - 查询页面中所有匹配选择器的元素，并返回
async browser.content.doesElementExist(selector) - 检查是否存在匹配选择器的元素，返回布尔值
async browser.content.isImageElement(selector) - 检查匹配选择器的元素是否为图片元素，返回布尔值
async browser.content.isAnchorElement(selector) - 检查匹配选择器的元素是否为锚链接元素，返回布尔值
async browser.content.isJsElement(selector) - 检查匹配选择器的元素是否为 JavaScript 元素，返回布尔值
async browser.content.isCssElement(selector) - 检查匹配选择器的元素是否为 CSS 元素，返回布尔值
async browser.content.getElementBySelector(selector) - 获取匹配选择器的第一个元素
async browser.content.getElementBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的第一个元素，等待指定时间
async browser.content.getElementsBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的所有元素，等待指定时间
async browser.content.getTextBySelector(selector) - 获取匹配选择器的元素的文本内容
async browser.content.getAllTextsBySelector(selector) - 获取匹配选择器的所有元素的文本内容
async browser.content.getHTMLBySelector(selector) - 获取匹配选择器的元素的 HTML 内容
async browser.content.getTextBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的元素的文本内容，等待指定时间
async browser.content.getHTMLBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的元素的 HTML 内容，等待指定时间
async browser.content.getElementsByTag(tag) - 获取所有匹配标签名称的元素
async browser.content.getElementByXpath(xpath) - 获取匹配 XPath 表达式的第一个元素
async browser.content.getSiblingBeforeText(selector, n) - 获取匹配选择器的元素前第 n 个同级元素的文本内容
async browser.content.getSiblingAfterText(selector, n) - 获取匹配选择器的元素后第 n 个同级元素的文本内容
async browser.content.getDataAttributeBySelector(selector) - 获取匹配选择器的元素的 data 属性
async browser.content.getAllDataAttributesBySelector(selector) - 获取匹配选择器的所有元素的 data 属性
async browser.content.countElementsBySelector(selector) - 计算匹配选择器的元素数量
async browser.content.getTextBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的文本内容，按索引选择
async browser.content.getHTMLBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的 HTML 内容，按索引选择
async browser.content.getDataBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的 data 属性，按索引选择
async browser.content.getValueBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的值，按索引选择
async browser.content.replaceClassBySelector(selector, newClass) - 替换匹配选择器的元素的类名
async browser.content.addClassBySelector(selector, newClass) - 为匹配选择器的元素添加类名
async browser.content.removeClassBySelector(selector, className) - 从匹配选择器的元素中移除类名
async browser.content.setStyleBySelector(selector, style) - 为匹配选择器的元素设置样式
async browser.content.getElementByText(text) - 获取包含指定文本的元素
async browser.content.getBrowserLogValues() - 获取浏览器控制台日志内容
async browser.content.waitForElement(selector) - 等待匹配选择器的元素出现
async browser.content.getHeightBySelector(selector) - 获取匹配选择器的元素的高度
async browser.content.getWidthBySelector(selector) - 获取匹配选择器的元素的宽度
async browser.content.findIPsInHTML() - 在页面的 HTML 中查找所有 IP 地址
async browser.content.getLastIPInHTML() - 获取页面 HTML 中的最后一个 IP 地址
async browser.content.searchContentInFullHTML(content) - 在完整的页面 HTML 中搜索指定内容并返回匹配结果
async browser.content.getElementsMatchingSelector(selector) - 获取匹配选择器的页面元素，包括标签名和文本内容
async browser.content.getChildElementsMatchingSelector(parentSelector, childSelector) - 获取匹配选择器的父元素下匹配子元素的页面元素，包括标签名和文本内容
async browser.content.getImagesMatchingSelector(selector) - 获取匹配选择器的图片元素
async browser.content.getImgAttributesMatchingSelector(selector) - 获取匹配选择器的图片元素的属性，包括 src、class、data-attr、id、alt
async browser.content.getLinkAttributesMatchingSelector(selector) - 获取匹配选择器的链接元素的属性，包括 href、class、data-attr、id、textInner

browser.util.platform.isWindows() - 判断当前操作系统是否是Windows。
browser.util.url.isDynamicUrl(url) - 判断给定的URL是否是动态的。
browser.util.platform.killChromeCommand() - 获取杀掉Chrome进程的命令。
browser.util.json.deepUpdate(target, source) - 深度更新目标对象`target`的属性，使用源对象`source`的属性。
browser.util.json.printKeys(obj, depth = 0, maxDepth = 10) - 打印对象的键值，可指定深度。
browser.util.json.containsAnyKey(obj, targetKeys) - 判断对象中是否包含任何目标键。
browser.util.url.normalizeUrl(url) - 标准化URL，删除协议和末尾斜杠。
browser.util.url.equalDomain(url1, url2) - 对比两个url,忽略最后的/和 queryString。
browser.util.url.equalDomainFull(url1, url2) - 对比两个url,忽略最后的/，但不忽略 queryString。。
browser.util.date.randomMillisecond(x = 0, y = 1500) - 返回在x到y之间的随机毫秒数。

async browser.util.htmlparse.content.init(browser, page) - 初始化 Content 类，传入浏览器和页面对象
async browser.util.htmlparse.content.getCurrentPage() - 获取当前页面对象，并返回
async browser.util.htmlparse.content.getFullPageOuterHTMLAndWait() - 获取完整页面的 HTML，等待页面加载完成后返回
async browser.util.htmlparse.content.getFullPageOuterHTML() - 获取完整页面的 HTML
async browser.util.htmlparse.content.getAllAnchorHrefs(completeURL) - 获取页面中所有锚链接的 href 属性值，可选择是否返回完整 URL
async browser.util.htmlparse.content.getAllImageSrcs(completeURL) - 获取页面中所有图片元素的 src 属性值，可选择是否返回完整 URL
async browser.util.htmlparse.content.getAllCssResourcePaths(completeURL) - 获取页面中所有 CSS 资源的路径，可选择是否返回完整 URL
async browser.util.htmlparse.content.getAllJsResourcePaths(completeURL) - 获取页面中所有 JavaScript 资源的路径，可选择是否返回完整 URL
async browser.util.htmlparse.content.queryAllElements(selector) - 查询页面中所有匹配选择器的元素，并返回
async browser.util.htmlparse.content.doesElementExist(selector) - 检查是否存在匹配选择器的元素，返回布尔值
async browser.util.htmlparse.content.isImageElement(selector) - 检查匹配选择器的元素是否为图片元素，返回布尔值
async browser.util.htmlparse.content.isAnchorElement(selector) - 检查匹配选择器的元素是否为锚链接元素，返回布尔值
async browser.util.htmlparse.content.isJsElement(selector) - 检查匹配选择器的元素是否为 JavaScript 元素，返回布尔值
async browser.util.htmlparse.content.isCssElement(selector) - 检查匹配选择器的元素是否为 CSS 元素，返回布尔值
async browser.util.htmlparse.content.getElementBySelector(selector) - 获取匹配选择器的第一个元素
async browser.util.htmlparse.content.getElementBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的第一个元素，等待指定时间
async browser.util.htmlparse.content.getElementsBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的所有元素，等待指定时间
async browser.util.htmlparse.content.getTextBySelector(selector) - 获取匹配选择器的元素的文本内容
async browser.util.htmlparse.content.getAllTextsBySelector(selector) - 获取匹配选择器的所有元素的文本内容
async browser.util.htmlparse.content.getHTMLBySelector(selector) - 获取匹配选择器的元素的 HTML 内容
async browser.util.htmlparse.content.getTextBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的元素的文本内容，等待指定时间
async browser.util.htmlparse.content.getHTMLBySelectorAndWait(selector, waitDuration) - 获取匹配选择器的元素的 HTML 内容，等待指定时间
async browser.util.htmlparse.content.getElementsByTag(tag) - 获取所有匹配标签名称的元素
async browser.util.htmlparse.content.getElementByXpath(xpath) - 获取匹配 XPath 表达式的第一个元素
async browser.util.htmlparse.content.getSiblingBeforeText(selector, n) - 获取匹配选择器的元素前第 n 个同级元素的文本内容
async browser.util.htmlparse.content.getSiblingAfterText(selector, n) - 获取匹配选择器的元素后第 n 个同级元素的文本内容
async browser.util.htmlparse.content.getDataAttributeBySelector(selector) - 获取匹配选择器的元素的 data 属性
async browser.util.htmlparse.content.getAllDataAttributesBySelector(selector) - 获取匹配选择器的所有元素的 data 属性
async browser.util.htmlparse.content.countElementsBySelector(selector) - 计算匹配选择器的元素数量
async browser.util.htmlparse.content.getTextBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的文本内容，按索引选择
async browser.util.htmlparse.content.getHTMLBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的 HTML 内容，按索引选择
async browser.util.htmlparse.content.getDataBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的 data 属性，按索引选择
async browser.util.htmlparse.content.getValueBySelectorAndIndex(selector, index) - 获取匹配选择器的元素的值，按索引选择
async browser.util.htmlparse.content.replaceClassBySelector(selector, newClass) - 替换匹配选择器的元素的类名
async browser.util.htmlparse.content.addClassBySelector(selector, newClass) - 为匹配选择器的元素添加类名
async browser.util.htmlparse.content.removeClassBySelector(selector, className) - 从匹配选择器的元素中移除类名
async browser.util.htmlparse.content.setStyleBySelector(selector, style) - 为匹配选择器的元素设置样式
async browser.util.htmlparse.content.getElementByText(text) - 获取包含指定文本的元素
async browser.util.htmlparse.content.getBrowserLogValues() - 获取浏览器控制台日志内容
async browser.util.htmlparse.content.waitForElement(selector) - 等待匹配选择器的元素出现
async browser.util.htmlparse.content.getHeightBySelector(selector) - 获取匹配选择器的元素的高度
async browser.util.htmlparse.content.getWidthBySelector(selector) - 获取匹配选择器的元素的宽度
async browser.util.htmlparse.content.findIPsInHTML() - 在页面的 HTML 中查找所有 IP 地址
async browser.util.htmlparse.content.getLastIPInHTML() - 获取页面 HTML 中的最后一个 IP 地址
async browser.util.htmlparse.content.searchContentInFullHTML(content) - 在完整的页面 HTML 中搜索指定内容并返回匹配结果
async browser.util.htmlparse.content.getElementsMatchingSelector(selector) - 获取匹配选择器的页面元素，包括标签名和文本内容
async browser.util.htmlparse.content.getChildElementsMatchingSelector(parentSelector, childSelector) - 获取匹配选择器的父元素下匹配子元素的页面元素，包括标签名和文本内容
async browser.util.htmlparse.content.getImagesMatchingSelector(selector) - 获取匹配选择器的图片元素
async browser.util.htmlparse.content.getImgAttributesMatchingSelector(selector) - 获取匹配选择器的图片元素的属性，包括 src、class、data-attr、id、alt
async browser.util.htmlparse.content.getLinkAttributesMatchingSelector(selector) - 获取匹配选择器的链接元素的属性，包括 href、class、data-attr、id、textInner

