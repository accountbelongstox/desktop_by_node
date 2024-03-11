const fs = require('fs');
const path = require('path');
const stringCase = require("./stringCase.js")
const fileCase = require('./fileCase.js');
const httpCase = require("./httpCase.js");
const { putTask } = require('./zipCase.js');
// const utilCase = require("./utilCase.js");

class Main {
    imagePath = false
    current_page = null
    page_queue = []
    hasBeenPageList = []

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
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

    set_style(select, styles) {
        let jscode = ``
        for (let style_name in styles) {
            let style_value = styles[style_name]
            style_name = stringCase.convertToCamelCase(style_name)
            style_value = stringCase.convertStyleValue(style_value)
            jscode += `ele.style.${style_name} = '${style_value}';\n`
        }
        if (jscode) {
            jscode = `
            document.querySelectorAll('${select}').forEach(ele=>{
                ${jscode}
            })
            `
            this.exejs(jscode)
        }
    }

    exejs(jscode) {
        this.event.sendToHtml(jscode)
    }

    add_class(select, classes) {
        if (typeof classes !== 'string') {
            classes = classes.join(' ')
        }
        let jscode = `document.querySelector('${select}').classList.add('${classes}')`
        this.exejs(jscode)
    }

    getImagePath() {
        if (!this.imagePath) {
            this.imagePath = fileCase.getTemp(`temp_img.png`)
        }
        return this.imagePath
    }

    async readImageByRemote(callback) {
        let imagePath = this.getImagePath()
        const bing_main_url = `https://cn.bing.com`
        const bing_url = `${bing_main_url}/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN`
        let data = await httpCase.getJSON(bing_url)
        let url = data.images[0].url.replaceAll('_1920x1080', '_UHD')
        let bing_image_url = bing_main_url + url
        httpCase.readRemoteImage(bing_image_url).then((imageBase64) => {
            fs.writeFileSync(imagePath, Buffer.from(imageBase64, 'base64'));
            if (callback) callback(imagePath)
        }).catch(e => { })
    }

    setBackgroundFromBase64(imageBase64, selector = 'body') {
        let jscode = `document.querySelector('${selector}').style.backgroundImage = "url('${imageBase64}')"`
        this.win.webContents.executeJavaScript(jscode, true).then((result) => { }).catch(e => { })
    }

    setBackgroundByLocal(selector) {
        let imagePath = this.getImagePath()
        let imageBase64
        if (fs.existsSync(imagePath)) {
            imageBase64 = fileCase.readBase64ByFile(imagePath)
        } else {
            imageBase64 = fileCase.readBase64ByFile(fileCase.get_stylesheet(`img/default_desktop.jpeg`))
        }
        if (imageBase64) {
            this.setBackgroundFromBase64(imageBase64, selector)
        }
    }

    setBackgroundByNetwork(selector) {
        this.readImageByRemote((imagePath) => {
            let imageBase64 = fileCase.readBase64ByFile(imagePath)
            this.setBackgroundFromBase64(imageBase64, selector)
        })
    }

    setBackground(selector = 'body') {
        this.setBackgroundByLocal(selector)
        this.setBackgroundByNetwork(selector)
    }
    addHTMLAfter(select, html) {
        if (!html) return
        let code = `document.querySelector(\`${select}\`).insertAdjacentHTML('afterend', \`${html}\`);if(window.electron.PreLoad)window.electron.registerClickHandlers();`
        this.exejs(code)
    }
    addHTMLAfterNotRefresh(select, html) {
        if (!html) return
        let code = `document.querySelector(\`${select}\`).insertAdjacentHTML('afterend', \`${html}\`);`
        console.log(code)
        this.exejs(code)
    }
    addHTMLBefore(select, html) {
        if (!html) return
        let code = `document.querySelector(\`${select}\`).insertAdjacentHTML('beforebegin', \`${html}\`);if(window.electron.PreLoad)window.electron.registerClickHandlers();`
        this.exejs(code)
    }
    addHTMLToInnerAfter(select, html) {
        if (!html) return
        let code = `document.querySelector(\`${select}\`).insertAdjacentHTML('beforeend', \`${html}\`);if(window.electron.PreLoad)window.electron.registerClickHandlers();`
        this.exejs(code)
    }
    addHTMLToInnerBefore(select, html) {
        if (!html) return
        let code = `document.querySelector(\`${select}\`).insertAdjacentHTML('afterbegin', \`${html}\`);if(window.electron.PreLoad)window.electron.registerClickHandlers();`
        this.exejs(code)
    }
    addHTMLToInnerBeforeOne(select, html, verifyId, info = false) {
        if (!html) return
        let info_html = ``
        if (info) {
            info_html = `
            console.log('select')
            console.log(\`${select}\`)
            console.log(ele)
            console.log('verifyId')
            console.log(\`${verifyId}\`)
            console.log(verifyEle)
            `
        }
        let code = `(()=>{
            let ele =  document.querySelector(\`${select}\`)
            let verifyEle =  document.querySelector(\`${verifyId}\`)
            ${info_html}
            if(ele){
                if(!verifyEle){
                    ele.insertAdjacentHTML('beforeend', \`${html}\`);
                    window.electron.registerClickHandlers();
                }
            }
        })()`
        if (info) {
            console.log(code)
        }
        this.exejs(code)
    }

    showElement(select) {
        let code = `
        (()=>{
            let ele = document.querySelector(\`${select}\`)
            if(ele){
                ele.style.display = 'block';
                ele.style.visibility = 'visible';
            }
        })()
        `
        this.exejs(code)
    }

    replaceClass(select, classA, classB) {
        let code = `
        (()=>{
            if(document.querySelector(\`${select}\`)){
                let element = document.querySelector(\`${select}\`)
                const classes = element.className.split(/\\s+/);
                const index = classes.indexOf(\`${classA}\`);
                if (index != -1) {
                    classes[index] = \`${classB}\`;
                } else {
                    classes.push(\`${classB}\`);
                }
                element.className = classes.join(' ');
            }
        })()
        `
        this.exejs(code)
    }

    setInnerText(select, text) {
        let code = `
        (()=>{
            let element = document.querySelector("${select}");
            if(element) {
                element.innerText = "${text}";
            }
        })()
        `;
        this.exejs(code);
    }

    log(msg) {
        let code = `
        console.log(\`${msg}\`)
        `;
        this.exejs(code);
    }

    setInnerHTML(select, html) {
        let code = `
        (()=>{
            let element = document.querySelector("${select}");
            if(element) {
                element.innerHTML = \`${html}\`;
            }
        })()
        `;
        this.exejs(code);
    }

    removeElement(select) {
        let code = `
        (()=>{
            let element = document.querySelector(\`${select}\`);
            if(element) {
                element.parentNode.removeChild(element);
            }
        })()
        `;
        this.exejs(code);
    }

    addClass(select, className) {
        let code = `
        (()=>{
            let element = document.querySelector("${select}");
            if(element && !element.classList.contains("${className}")) {
                element.classList.add("${className}");
            }
        })()
        `;
        this.exejs(code);
    }

    removeClass(select, className) {
        let code = `
        (()=>{
            let element = document.querySelector("${select}");
            if(element) {
                element.classList.remove("${className}");
            }
        })()
        `;
        this.exejs(code);
    }

    toggleClass(select, className) {
        let code = `
        (()=>{
            let element = document.querySelector("${select}");
            if(element) {
                element.classList.toggle("${className}");
            }
        })()
        `;
        this.exejs(code);
    }

    hideElement(select) {
        let code = `
        (()=>{
            let ele = document.querySelector(\`${select}\`)
            if(ele){
                ele.style.display = 'none'
            }
        })()
        `
        this.exejs(code)
    }

    updateHTMLAfterInserToInnerBefore(upId, insertId, html, override = true) {
        let overrideHTML = override ? `upId.innerHTML = html` : ``
        let code = `
        (()=>{
            let html = \`${html}\`
            let upId = document.querySelector(\`${upId}\`)
            if(upId){
                ${overrideHTML}
            }else{
                document.querySelector(\`${insertId}\`).insertAdjacentHTML('beforeend', html);
            }
            if(window.electron.PreLoad)window.electron.registerClickHandlers();
        })()
        `
        this.exejs(code)
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

    getPreviousPage() {
        if (this.page_queue.length >= 2) {
            return this.page_queue[this.page_queue.length - 2]
        }
        return null
    }

    checkCurrentPage(page) {
        return page == this.current_page
    }

    getCurrentPage() {
        return this.current_page
    }

    setHasBeenPage(page) {
        if (!this.hasBeenPageList.includes(page)) {
            this.hasBeenPageList.push(page)
        }
    }

    isHasBeenPage(page) {
        return this.hasBeenPageList.includes(page)
    }

    autoExecBeforeByLoaded(page_name) {
        if (!this.isHasBeenPage(page_name)) {
            this.execPageEvent(page_name, `autoExecBeforeByLoadedOne`)
        }
        console.log(`autoExecBeforeByLoaded ${page_name}`)
        this.execPageEvent(page_name, `autoExecBeforeByLoaded`)
    }

    autoExecAfterByLoaded(page_name) {
        this.setHasBeenPage(page_name)
        this.page_queue.push(page_name)
        this.current_page = page_name
        if (!this.isHasBeenPage(page_name)) {
            this.execPageEvent(page_name, `autoExecAfterByLoadedOne`)
        }
        this.execPageEvent(page_name, `autoExecAfterByLoaded`)

        let previous_page = this.getPreviousPage()
        if (previous_page) {
            this.execPageEvent(previous_page, `closeAfterDestructe`)
        }
    }

    execPageEvent(page_name, event_name) {
        let category_name = `event_${page_name}`
        if (this.encyclopediaOfFunctions[category_name]) {
            let category_event = this.encyclopediaOfFunctions[category_name]
            console.log(`category_name ${category_name}`)
            console.log(`page_name ${page_name}`)
            // console.log(category_event)
            if (category_event[event_name]) {
                category_event[event_name]()
            } else {
                console.log(`There is no "${event_name}" event under the classification object "${category_name}", please add it to "classified_events/${category_name}_event.js"`)
            }
        } else {
            console.log(`If there is no such classified event object, please add "${category_name}" and the init() method in the "classified_events/" folder`)
        }
    }

    loadPageBaseJS(page_name) {
        let files = [
            `../../classified_events/load_${page_name}.js`,
            `../../classified_events/public.js`,
        ]
        // files.forEach((ref, i) => {
        //     files[i] = path.join(__dirname, ref);
        // });
        return files
    }
}

module.exports = new Main()