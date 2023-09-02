import { root } from "./utils/domElements";
import { Analog } from "./Analog";
import { Alarm } from "./Alarm";
import { removeAllChildNodes } from "./utils/functions";

export class Digital {
    static buildClock = (mode: "12 hour" | "24 hour") => {
        const digital = document.createElement("div");
        digital.id = "digital";
        digital.style.border = "10px solid black";
        digital.style.borderRadius = "15px";
        digital.style.height = "175px";
        digital.style.width = "330px";
        digital.style.margin = "50px auto";
        digital.style.fontSize = "3.8rem";
        digital.style.fontFamily = "'Orbitron', sans-serif";
        digital.style.color = "red";
        digital.style.display = "flex";
        digital.style.flexWrap = "wrap";
        digital.style.alignItems = "center";
        root.appendChild(digital);

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

        let date;

        const interval = setInterval(() => {
            date = new Date(); // Has to be declared inside setInterval because clock does not update if it isn't

            let hour;

            mode === "12 hour" ? hour = (date.getHours() < 12 ? date.getHours() : date.getHours() - 12) : hour = date.getHours();

            hourScreen.textContent = hour.toString();

            const second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
            secondScreen.textContent = second.toString();

            const minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            minuteScreen.textContent = minute.toString();

            Alarm.setOffAlarm(interval);
        }, 1000);

        date = new Date();

        if(mode === "12 hour") {
            const AMPMScreen = document.createElement("div");
            AMPMScreen.textContent = (date.getHours() < 12 ? "AM" : "PM");
            AMPMScreen.style.fontSize = "2rem";
            AMPMScreen.style.flexBasis = "100%";
            digital.appendChild(AMPMScreen);
        }

        const form = document.createElement("form");
        form.style.marginBottom = "20px";
        root.appendChild(form);

        const formMessage = document.createElement("div");
        formMessage.textContent = "Select Clock Mode";
        form.appendChild(formMessage);

        const radioBtn1 = document.createElement("input");
        radioBtn1.type = "radio";
        radioBtn1.name = "mode"
        radioBtn1.id = "12hour";
        radioBtn1.value = "12";
        mode === "12 hour" ? radioBtn1.checked = true : false;
        radioBtn1.onclick = () => {
            clearInterval(interval);
            removeAllChildNodes(root);

            if(localStorage.getItem("alarm")) {
                Alarm.buildAlarmInfo();
            } else {
                Alarm.buildAlarmForm();
            }
            
            Digital.buildClock("12 hour");
        }
        form.appendChild(radioBtn1);

        const label1 = document.createElement("label");
        label1.htmlFor = "12hour";
        label1.textContent = "12 hour";
        form.appendChild(label1);

        const radioBtn2 = document.createElement("input");
        radioBtn2.type = "radio";
        radioBtn2.name = "mode"
        radioBtn2.id = "24hour";
        radioBtn2.value = "24";
        mode === "24 hour" ? radioBtn2.checked = true : false;
        radioBtn2.onclick = () => {
            clearInterval(interval);
            removeAllChildNodes(root);
            
            if(localStorage.getItem("alarm")) {
                Alarm.buildAlarmInfo();
            } else {
                Alarm.buildAlarmForm();
            }

            Digital.buildClock("24 hour");
        }
        form.appendChild(radioBtn2);

        const label2 = document.createElement("label");
        label2.htmlFor = "24hour";
        label2.textContent = "24 Hour";
        form.appendChild(label2);

        const analogBtn = document.createElement("button");
        analogBtn.className = "button";
        analogBtn.textContent = "Switch to Analog Clock";
        analogBtn.onclick = () => {
            clearInterval(interval);
            removeAllChildNodes(root);
            
            if(localStorage.getItem("alarm")) {
                Alarm.buildAlarmInfo();
            } else {
                Alarm.buildAlarmForm();
            }
            
            Analog.buildClock();
        }
        root.appendChild(analogBtn);    
    }
};