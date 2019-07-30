const root = document.body;

const tickEvent = new CustomEvent('tick', {
    bubbles: true
});

import timer from "./components/timer.js";
import keypad from "./components/keypad.js";

setInterval(() => { 
    document.body.dispatchEvent(tickEvent)
}, 200);

let mainView = {
    view: () => {
        return m("main.app-layout", [
            m(timer),
            m(keypad)
        ]);
    }
}

m.mount(root, mainView);