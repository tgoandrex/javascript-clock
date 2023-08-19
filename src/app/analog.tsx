import { root } from "./utils/domElements";
import { removeAllChildNodes } from "./utils/functions";

export class Analog {
    static buildClock = () => {
        removeAllChildNodes(root);

        const analog = document.createElement("div");
        analog.id = "analog";
        analog.style.border = "1px solid black";
        analog.style.borderRadius = "100%";
        analog.style.height = "500px";
        analog.style.width = "500px";
        analog.style.margin = "50px auto 0 auto";
        root?.appendChild(analog);

        const hourHand = document.createElement("div");
        hourHand.id = "hour-hand";
        hourHand.className = "hand";
        hourHand.style.height = "150px";
        hourHand.style.width = "15px";
        analog.appendChild(hourHand);

        const minuteHand = document.createElement("div");
        minuteHand.id = "minute-hand";
        minuteHand.className = "hand";
        minuteHand.style.height = "225px";
        minuteHand.style.width = "15px";
        minuteHand.style.transformOrigin = "top";
        minuteHand.style.transform = "translate(0, -150px)";
        analog.appendChild(minuteHand);

        const secondHand = document.createElement("div");
        secondHand.id = "minute-hand";
        secondHand.className = "hand";
        secondHand.style.height = "225px";
        secondHand.style.width = "5px";
        secondHand.style.transformOrigin = "top";
        secondHand.style.transform = "translate(0, -375px)";
        secondHand.style.backgroundColor = "red";
        analog.appendChild(secondHand);

        let secondTick = 10;
        setInterval(() => {
            secondHand.style.translate = "0 -375px";
            secondHand.style.transformOrigin = "top";
            secondHand.style.transform = `rotate(${secondTick}deg)`;
            secondTick = (secondTick + 10);
        }, 1000);

        let minuteTick = 10;
        setInterval(() => {
            minuteHand.style.translate = "0 -150px";
            minuteHand.style.transformOrigin = "top";
            minuteHand.style.transform = `rotate(${minuteTick}deg)`;
            minuteTick = (minuteTick + 10);
        }, 10000);

        let hourTick = 10;
        setInterval(() => {
            hourHand.style.transformOrigin = "top";
            hourHand.style.transform = `rotate(${hourTick}deg)`;
            hourTick = (hourTick + 10);
        }, 100000);
    }
};