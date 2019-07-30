class Timer {
    constructor(vnode) {
        this.time = {
            allowance: 0,
            startTime: 0,
            warn: 0,
            remaining: () => {
                return 0;
            },
            endTime: () => {
                return this.time.startTime + this.time.allowance;
            },
            minutes: () => Math.floor((this.time.remaining() / 1000) / 60),
            seconds: () => Math.floor(this.time.remaining() / 1000) - (this.time.minutes() * 60),
            toString: () => `${padDigits(this.time.minutes())}:${padDigits(this.time.seconds())}`
        }
        this.now = () => {
            return new Date();
        }
        this.isPaused = true;
        this.colourClass = "green";

        /** Event Listeners **/
        document.body.addEventListener("tick", () => {
            this.tick();
        });

        document.body.addEventListener("toggleTimer", () => {
            this.playPause()
        });

        document.body.addEventListener("setTimerTime", (e) => {
            this.setTime(e.detail.minutes, e.detail.add);
        });

    }

    setTime(minutes, addMode) {
        let currentTime = this.time.remaining();

        if (addMode) {
            this.time.allowance = currentTime + (minutes * 1000) * 60;
        } else {
            this.time.allowance = (minutes * 1000) * 60;
        }

        this.time.warn = this.time.allowance * 0.33;

        this.time.startTime = this.now().getTime();
        this.time.remaining = () => {
            return (this.time.endTime() - this.now().getTime());
        }
    }

    playPause() {
        if (this.isPaused) {
            this.time.allowance = this.time.remaining();
            this.time.startTime = this.now().getTime();
        }

        this.isPaused = !this.isPaused;
    }

    tick() {
        let currentTime = this.time.remaining();

        if (this.isPaused) {
            if (currentTime < 0) {
                this.time.remaining = () => 0;
            } else {
                this.time.remaining = () => currentTime;
            }
            this.setColourClass(currentTime);
        } else {
            if (currentTime > 999) {
                this.time.remaining = () => {
                    return this.time.endTime() - this.now().getTime();
                }
            } else {
                this.time.remaining = () => {
                    return 500
                }
            }

            this.setColourClass(currentTime);
        }
    }

    setColourClass(currentTime) {
        if (this.isPaused) {
            this.colourClass = "green";
            return;
        }

        let newColour;

        if (currentTime > this.time.warn) {
            newColour = "green";
        } else if (currentTime < this.time.warn && currentTime > 1000) {
            newColour = "amber";
        } else {
            newColour = (this.colourClass == "red"?"amber":"red");
        }

        this.colourClass = newColour;
    }

    view() {
        return m(`article.time-display`, [
            m(`section.timer.${this.colourClass}`, `${this.time.toString()}`),
            m('section.timer-background', "ÆÆ:ÆÆ")
        ])
    }
}

function padDigits(digit) {
    let digitString = String(digit);
    if (digitString.length == 1) {
        return `0${digitString}`;
    }

    return digitString;
}

export default Timer;