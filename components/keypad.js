import clock from "./clock.js";

class Keypad {
    constructor(vnode) {
        this.addMode   = false;
        this.isPaused  = true;

        document.body.addEventListener("timerHasFinished", () => {
            this.isPaused = true;
        });

        document.body.addEventListener("keydown", (event) => {
            if (!event.isTrusted) {
                return;
            }

            if (event.key == " ") {
                this.toggleTimer();
                return;
            }

            if (event.key >= 0 && event.key <= 9) {
                this.setTime(event.key);
                return;
            }

            if (event.key == "Shift" || event.key == "=") {
                this.toggleAddMode();
                return;
            }
        });
    }

    get3buttons(start) {
        let list = []
        let i;
        for (i = start; i <= start+2; i++) {
            let li = i;
            list.push(m("button.dark-btn", {
                onclick: () => {this.setTime(li)}
            },i))
        }
        return list;
    }

    setTime(minutes) {
        document.body.dispatchEvent(new CustomEvent('setTimerTime', {
            detail: {
                minutes: minutes,
                add: this.addMode
            },
            bubbles: true
        }));
    }

    resetTime() {
        document.body.dispatchEvent(new CustomEvent('setTimerTime', {
            detail: {
                minutes: 0,
                add: false
            },
            bubbles: true
        }));
    }

    toggleAddMode() {
        this.addMode = !this.addMode;
    }

    toggleTimer() {
        document.body.dispatchEvent(new CustomEvent('toggleTimer'));
        this.isPaused = !this.isPaused;
    }

    view() {
        let buttons = [];
        buttons.push(m(clock));
        buttons = buttons.concat(this.get3buttons(7));

        buttons.push(m("button.dark-btn.btn-tall.btn-indicator", {
            onclick: () => {this.toggleAddMode()}
        }, 
        [
            m("p", "+"),
            m(`footer${(this.addMode?'.green':'')}`)
        ]))

        buttons = buttons.concat(this.get3buttons(4));
        buttons = buttons.concat(this.get3buttons(1));
        buttons.push(m("button.dark-btn.btn-wide", {
            onclick: () => {this.resetTime()}
        }, "0"))
        buttons.push(m("button.dark-btn.btn-wide", {
            onclick: () => {this.toggleTimer()}
        }, (this.isPaused?'Start':'Pause')))

        return m("section.controls",buttons)
    }

}

export default Keypad;