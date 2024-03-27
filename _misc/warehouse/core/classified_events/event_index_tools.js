class Main{

    init(){
        setInterval(()=>{
            console.log(`sendToHtml`)
            this.event.sendToHtml(`test`,{a:"test"})
        },1000)
    }
    
    setRef(win, app, event, config_base, encyclopediaOfFunctions) {
        this.win = win
        this.app = app
        this.event = event
        this.config_base = config_base
        this.encyclopediaOfFunctions = encyclopediaOfFunctions
    }
}

module.exports = new Main()