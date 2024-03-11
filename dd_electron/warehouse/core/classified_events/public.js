
(() => {
    class PreElectonWindow {
        cids = []

        init() {
            $("#settieng_panel-circle, #show_setting,.setting-box-toggle").click(function () {
                $(".setting_panel_body").toggleClass("show");
            });
        }

        imageLoadError(ele, img_id) {
            console.log(`imageLoadError`)
            console.log(ele)
            console.log(`img_id ${img_id}`)
            let element_string = this.convertObjectToKeyValue(ele)
            send(`image_load_error`, element_string);
        }

        message(rData) {
            let data = rData.data
            let {
                type,
                message,
                timeout
            } = data
            if (type === 'success') {
                alertify.success(message);
            } else if (type === 'warn') {
                alertify.warning(message);
            } else if (type === 'info') {
                alertify.message(message);
            } else if (type === 'confirm') {
                if (!alertify.confirmAlert) {
                    alertify.dialog('confirmAlert', function factory() {
                        return {
                            build: function () {
                                var infoHeader = '<span class="fa fa-commenting fa-2x" '
                                    + 'style="vertical-align:middle;color:green;">'
                                    + '</span> App Information';
                                this.setHeader(infoHeader);
                            }
                        };
                    }, true, 'alert');
                }
                alertify.confirmAlert(message, function () {
                    alertify.message('OK');
                });
            } else if (type === 'log') {
                console.log(`--------- message Log---------`)
                console.log(message)
                console.log(`\n\n`)
            } else {
                alertify.error(message);
            }
        }

        show(rData) {
            let data = rData.data
            let selector = data.selector
            $(selector).show();
        }

        hide(rData) {
            let data = rData.data
            let selector = data.selector
            $(selector).hide();
        }

        convertObjectToKeyValue(element) {
            if (typeof element == 'string') {
                return element
            }
            const result = {};
            const attributes = element.attributes;
            for (let i = 0; i < attributes.length; i++) {
                const attribute = attributes[i];
                result[attribute.name] = attribute.value;
            }
            return result;
        }

        addProgress(token, maxValue) {
            const elements = Array.from(document.querySelectorAll('[id^="progrese_"]'));
            let index = 0;
            let bottom = '40px'; // 初始位置

            if (elements.length) {
                const lastElement = elements[elements.length - 1];
                index = parseInt(lastElement.getAttribute('data-index')) + 1;
                const lastElementBottom = parseInt(window.getComputedStyle(lastElement).bottom.replace('px', ''));
                bottom = (lastElementBottom + 20) + 'px';
            }

            const html = `
                <div id='progrese_${index}' data-index='${index}' data-token='${token}' data-max-value='${maxValue}' style='position:absolute;bottom:${bottom};left:200px;z-index:999999999;width:30%;'>
                <span style="color:#fff;font-size: 12px;">0% Complete </span>
                    <div class="progress progress-xxs" >
                        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 30%"></div>
                    </div>
                </div>
                `;

            document.body.insertAdjacentHTML('beforeend', html);
        }

        updateProgress(token, value) {
            const progressElement = document.querySelector(`[data-token="${token}"]`);
            if (!progressElement) {
                console.error(`No progress bar found for token: ${token}`);
                return;
            }
            const maxValue = parseFloat(progressElement.getAttribute('data-max-value'));
            const percentage = (value / maxValue) * 100;
            const progressBar = progressElement.querySelector(".progress-bar");
            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute("aria-valuenow", percentage);
            progressBar.querySelector('.sr-only').innerText = `${percentage.toFixed(2)}% Complete`;
            if (percentage >= 100) {
                progressElement.remove();
                const subsequentProgressElements = Array.from(document.querySelectorAll('[id^="progrese_"]')).filter(el => parseInt(el.getAttribute('data-index')) > parseInt(progressElement.getAttribute('data-index')));
                subsequentProgressElements.forEach(el => {
                    const currentBottom = parseInt(window.getComputedStyle(el).bottom.replace('px', ''));
                    el.style.bottom = `${currentBottom - 20}px`;
                });
            }
        }

        removeProgress(token) {
            const progressElement = document.querySelector(`[data-token="${token}"]`);
            if (!progressElement) {
                console.error(`No progress bar found for token: ${token}`);
                return;
            }
            const removedIndex = parseInt(progressElement.getAttribute('data-index'));
            progressElement.remove();
            const subsequentProgressElements = Array.from(document.querySelectorAll('[id^="progrese_"]'))
                .filter(el => parseInt(el.getAttribute('data-index')) > removedIndex);
            subsequentProgressElements.forEach(el => {
                const currentBottom = parseInt(window.getComputedStyle(el).bottom.replace('px', ''));
                el.style.bottom = `${currentBottom - 20}px`;
            });
        }
    }
    let PreElectonWindowInstance = new PreElectonWindow()
    registerPpublicMethod(`public`, PreElectonWindowInstance)
    PreElectonWindowInstance.init()
})()

