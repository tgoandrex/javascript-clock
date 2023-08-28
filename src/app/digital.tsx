import { root } from "./utils/domElements";
import { Analog } from "./analog";
import { removeAllChildNodes } from "./utils/functions";

export class Digital {
    static buildClock = () => {
        const digital = document.createElement("div");
        digital.id = "digital";
        digital.style.border = "1px solid black";
        digital.style.height = "250px";
        digital.style.width = "450px";
        digital.style.margin = "50px auto 0 auto";
        root?.appendChild(digital);

        const screen = document.createElement("div");
        screen.style.display = "flex";

        digital.appendChild(screen);

        const hourScreen = document.createElement("div");
        hourScreen.style.flexGrow = "1";
        screen.appendChild(hourScreen);

        const minuteScreen = document.createElement("div");
        minuteScreen.style.flexGrow = "1";
        screen.appendChild(minuteScreen);
        
        const secondScreen = document.createElement("div");
        secondScreen.style.flexGrow = "1";
        screen.appendChild(secondScreen);

        const interval = setInterval(() => {
            const date = new Date();

            const hour = date.getHours();
            hourScreen.innerHTML = hour.toString();

            const second = date.getSeconds();
            secondScreen.innerHTML = second.toString();

            const minute = date.getMinutes();
            minuteScreen.innerHTML = minute.toString();
        }, 1000);

        const analogBtn = document.createElement("button");
        analogBtn.textContent = "Switch to Analog Clock";
        analogBtn.onclick = () => {
            clearInterval(interval);
            removeAllChildNodes(root);
            Analog.buildClock();
        }
        root.appendChild(analogBtn);    
    }
};