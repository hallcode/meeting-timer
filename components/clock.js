class Clock {
    constructor(vnode) {
        this.seperator   = ":"
        this.element     = "header"
        this.timeString  = `--${this.seperator}--${this.seperator}--`;

        document.body.addEventListener("tick", () => {
            this.setTime(new Date());
        });
    }

    padDigits(digit) {
        let digitString = String(digit);
        if (digitString.length == 1) {
            return `0${digitString}`;
        }
    
        return digitString;
    }

    setTime(date) {    
        let hour   = () => this.padDigits(date.getHours());
        let minute = () => this.padDigits(date.getMinutes());
        let second = () => this.padDigits(date.getSeconds());
    
        this.timeString = `${hour()}${this.seperator}${minute()}${this.seperator}${second()}`;
        m.redraw();
    }

    view() {
        return m(`${this.element}.time-display`, [
            m("section.clock", `${this.timeString}`),
            m('section.clock-background', "ÆÆ:ÆÆ:ÆÆ")
        ])
    }
} 



export default Clock;