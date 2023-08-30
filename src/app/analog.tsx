import { root } from "./utils/domElements";
import { Digital } from "./digital";
import { removeAllChildNodes } from "./utils/functions";
import background from "./utils/images/analog-clock.jpg";

export class Analog {
    static buildClock = () => {
        const analog = document.createElement("div");
        const secondHand = document.createElement("div");
        const minuteHand = document.createElement("div");
        const hourHand = document.createElement("div");

        const interval = setInterval(() => {
            const date = new Date();

            analog.id = "analog";
            analog.style.position = "relative";
            analog.style.height = "300px";
            analog.style.width = "300px";
            analog.style.margin = "50px auto";
            analog.style.background = `url(${background}) no-repeat`;
            root?.appendChild(analog);

            const second = date.getSeconds();
            const secondRotation = 6 * second;
            secondHand.id = "second-hand";
            secondHand.className = "hand";
            secondHand.style.position = "absolute";
            secondHand.style.top = "9%";
            secondHand.style.left = "49.25%";
            secondHand.style.height = "40%";
            secondHand.style.width = "1%";
            secondHand.style.transform = `rotate(${secondRotation}deg)`;
            secondHand.style.backgroundColor = "red";
            analog.appendChild(secondHand);

            const minute = date.getMinutes();
            const minuteRotation = 6 * minute;
            minuteHand.id = "minute-hand";
            minuteHand.className = "hand";
            minuteHand.style.position = "absolute";
            minuteHand.style.top = "19%";
            minuteHand.style.left = "48.9%";
            minuteHand.style.height = "30%";
            minuteHand.style.width = "1.6%";
            minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
            analog.appendChild(minuteHand);

            const hour = date.getHours();
            const hourRotation = 30 * hour + minute / 2;
            hourHand.id = "hour-hand";
            hourHand.className = "hand";
            hourHand.style.position = "absolute";
            hourHand.style.top = "25%";
            hourHand.style.left = "48.85%";
            hourHand.style.height = "25%";
            hourHand.style.width = "1.8%";
            hourHand.style.transform = `rotate(${hourRotation}deg)`;
            analog.appendChild(hourHand);
        }, 1000);

        const digitalBtn = document.createElement("button");
        digitalBtn.className = "button";
        digitalBtn.textContent = "Switch to Digital Clock";
        digitalBtn.onclick = () => {
            clearInterval(interval);
            removeAllChildNodes(root);
            Digital.buildClock("12 hour");
        }
        root.appendChild(digitalBtn);
    }
};