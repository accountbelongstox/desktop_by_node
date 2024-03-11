const stringCase = require("./stringCase.js")

class Main {

    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }

    processMessages(message, timeout, type = 'success') {
        if (!timeout) {
            timeout = 4000
        }
        timeout = timeout / 1000

        let data = {
            type,
            message,
            timeout
        }
        this.event.sendToWebSocket(`public.message`, data, null,true)
    }

    log(message, timeout = 1500) {
        message = stringCase.toString(message)
        console.log(message)
        this.processMessages(message, timeout, "log")
    }

    success(message, timeout = 1500) {
        message = stringCase.toString(message)
        console.log(message)
        this.processMessages(message, timeout, "success")
    }

    error(message, timeout = 1500) {
        message = stringCase.toString(message)
        console.error(message)
        this.processMessages(message, timeout, "error")
    }

    confirm(message, timeout = 1500) {
        message = stringCase.toString(message)
        console.log(`confirm`+message)
        this.processMessages(message, timeout, "confirm")
    }

    warn(message, timeout = 1500) {
        message = stringCase.toString(message)
        console.error(message)
        this.processMessages(message, timeout, "warn")
    }

}

module.exports = new Main()