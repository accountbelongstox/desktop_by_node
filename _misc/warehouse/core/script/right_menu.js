
(function ($) {
    class AppMenuManager {
        defaultImageBase64Icon = null
        current = {}

        constructor() {
            this.defaultImages = send('')
            this.contextMenu = $('#customContextMenu');
            this.initializeAlertify();
            this.registerEvents();
        }

        initializeAlertify() {
            send('shortcutIconCase:getDefaultImageBase64Icon', (rData) => {
                this.defaultImageBase64Icon = rData.data
            })
            alertify.defaults.glossary.title = '';
            alertify.defaults.transition = "zoom";
            if (!alertify.errorAlert) {
                alertify.dialog('errorAlert', function () {
                    return {
                        build: function () {
                            const errorHeader = '<span class="fa fa-times-circle fa-2x" style="vertical-align:middle;color:#e10000;"></span> App Error';
                            this.setHeader(errorHeader);
                        }
                    };
                }, true, 'alert');
            }
        }

        registerEvents() {
            $(document).on('click', this.hideContextMenu.bind(this));
        }

        register(target, action) {
            send(action, target);
            //send()定义在preloadExpress.js里面
        }

        displayAlert(message) {
            alertify.errorAlert(message, function () {
                alertify.message('OK');
            });
        }

        executeIfExists(element) {
            const exists = $(element).data('exists');
            if (!exists || exists == 'false') {
                this.displayAlert(`Has not been installed`);
                console.log(element)
                return false
            } else {
                return true
            }
        }

        openSoftwareLocation() {
            let aid = this.current.aid
            let ele = document.querySelector(`#${aid}`)
            if (this.executeIfExists(ele)) {
                this.register(ele, 'opendir');
            }
        }

        openIconDir() {
            let aid = this.current.aid
            let ele = document.querySelector(`#${aid}`)
            this.register(ele, 'openicondir');
        }

        runAsAdmin() {
            let aid = this.current.aid
            let ele = document.querySelector(`#${aid}`)
            if (this.executeIfExists(ele)) {
                this.register(ele, 'runexe');
            }
        }

        reinstall() {
            let aid = this.current.aid
            let basename = this.current.basename
            let target = this.current.target
            let groupname = this.current.group
            // let ele = document.querySelector(`#${aid}`)
            let installByConfig = {
                basename,target
            }
            console.log(installByConfig,groupname)
            send(`wingetCase:installByConfig`,installByConfig,groupname,(r)=>{
                console.log(r)
            })
        }

        update() {
            let aid = this.current.aid
            let ele = document.querySelector(`#${aid}`)
            if (this.executeIfExists(ele)) {
                this.register(ele, 'updatesoft');
            }
        }

        backup() {
            let aid = this.current.aid
            let ele = document.querySelector(`#${aid}`)
            if (this.executeIfExists(ele)) {
                this.register(ele, 'backuppackage');
            }
        }

        checkInstallationStatus(target) {
            // 这里模拟检查软件是否已安装，你应该根据实际情况进行实现
            // 假设我们使用一个名为 isSoftwareInstalled 的函数来检查
            const isInstalled = isSoftwareInstalled(target);
            return isInstalled;
        }

        rightMouseMenu(event, ele) {
            event.preventDefault();
            ele = $(ele);
            const exists = ele.data('exists');
            const target = ele.data('exec');
            const group = ele.data('group');
            const aid = ele.attr('id');
            const basename = ele.data('basename');

            console.log(ele, exists)
            const imgElement = ele.find('img').first();
            this.contextMenu.find('.navbar-custom-menu li a').each((index, a) => {
                const isExists = exists && exists !== 'false';
                if (index < 2) {
                    $(a).css('color', isExists ? '#000' : '#ccc');
                }
                $('.customContextMenuImg').css({
                    'filter': isExists ? 'none' : 'grayscale(100%)',
                    'opacity': isExists ? '1' : '0.5'
                });
            });

            if (imgElement) {
                const imgSrc = imgElement.attr('src');
                $('.customContextMenuImg').attr('src', imgSrc);
                this.contextMenu.css({
                    'backgroundImage': `url(${imgSrc})`,
                    'backgroundSize': '50%',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundColor': 'rgba(255, 255, 255, 0.7)',
                    'backgroundPosition': '130px 180px, calc(100% - 50px) 50px'
                });
            } else {
                $('.customContextMenuImg').attr('src', this.defaultImageBase64Icon);
            }

            this.contextMenu.css({
                'left': event.pageX + 'px',
                'top': event.pageY + 'px',
                'display': 'block'
            });
            this.current = {
                aid,
                target,
                group,
                basename
            }
        }

        hideContextMenu() {
            this.contextMenu.hide();
        }
    }

    $(document).ready(function () {
        const appMenuManager = new AppMenuManager();
        window.appMenuManager = appMenuManager;
    });
    // $(document).on('contextmenu', function (e) {
    //     e.preventDefault();
    // });
})(jQuery);
