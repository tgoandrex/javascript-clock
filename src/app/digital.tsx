import { root } from "./utils/domElements";
import { Analog } from "./analog";
import { removeAllChildNodes } from "./utils/functions";

export class Digital {
    static buildClock = () => {
        const digital = document.createElement("div");
        digital.id = "digital";
        digital.style.border = "10px solid black";
        digital.style.borderRadius = "15px";
        digital.style.height = "175px";
        digital.style.width = "330px";
        digital.style.margin = "50px auto";
        digital.style.fontSize = "4rem";
        digital.style.fontFamily = "'Orbitron', sans-serif";
        digital.style.color = "red";
        digital.style.display = "flex";
        digital.style.alignItems = "center";
        root?.appendChild(digital);

        const hourScreen = document.createElement("div");
        hourScreen.style.flexGrow = "2";
        digital.appendChild(hourScreen);

        const colonScreen = document.createElement("div");
        colonScreen.style.flexGrow = "1";
        colonScreen.textContent = ":";
        digital.appendChild(colonScreen);

        const minuteScreen = document.createElement("div");
        minuteScreen.style.flexGrow = "2";
        digital.appendChild(minuteScreen);
        
        const secondScreen = document.createElement("div");
        secondScreen.style.flexGrow = "2";
        digital.appendChild(secondScreen);

        const interval = setInterval(() => {
            const date = new Date();

            const hour = date.getHours();
            hourScreen.textContent = hour.toString();

            const second = (date.getSeconds()<10?'0':'') + date.getSeconds();
            secondScreen.textContent = second.toString();

            const minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
            minuteScreen.textContent = minute.toString();
        }, 1000);

        const analogBtn = document.createElement("button");
        analogBtn.className = "button";
        analogBtn.textContent = "Switch to Analog Clock";
        analogBtn.onclick = () => {
            clearInterval(interval);
            removeAllChildNodes(root);
            Analog.buildClock();
        }
        root.appendChild(analogBtn);    
    }
};