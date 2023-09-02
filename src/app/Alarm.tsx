import { root } from "./utils/domElements";
import { Analog } from "./Analog";
import { removeAllChildNodes } from "./utils/functions";
import audio from "./utils/sounds/alarm-sound.mp3"

export class Alarm {
    private time;

    constructor(time: string) {
        this.time = time;
    }

    static createNewAlarm = (data: FormData) => {
        const time = data.get("time") as string;
        return new Alarm(time);
    }

    static setOffAlarm = (interval: NodeJS.Timeout) => {
        const date = new Date();
        if(localStorage.getItem("alarm") && `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes(): date.getMinutes()}` === JSON.parse(localStorage.getItem("alarm")).time) {
            const audioElement = new Audio(audio);
            audioElement.play();

            clearInterval(interval);
            removeAllChildNodes(root);

            localStorage.removeItem("alarm");
            
            Alarm.buildAlarmForm();
            Analog.buildClock();
        }
    }

    static buildAlarmForm = () => {
        const form = document.createElement("form");
        form.id = "alarm-form";
        root.appendChild(form);

        const formTitle = document.createElement("h3");
        formTitle.textContent = "Set New Alarm";
        form.appendChild(formTitle);

        // <div class="form-group">?

        const labelTime = document.createElement("label");
        labelTime.htmlFor = "time";
        labelTime.textContent = "Time:";
        form.appendChild(labelTime);

        const lineBreak = document.createElement("br");
        form.appendChild(lineBreak);

        const inputTime = document.createElement("input");
        inputTime.type = "time";
        inputTime.id = "time";
        inputTime.name = "time";
        inputTime.required = true;
        form.appendChild(inputTime);

        form.appendChild(lineBreak);

        const submitBtn = document.createElement("input");
        submitBtn.type = "submit";
        submitBtn.value = "Submit";
        form.appendChild(submitBtn);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
        
            let formData = new FormData();
            formData.append("time", inputTime.value);
        
            localStorage.setItem("alarm", JSON.stringify(Alarm.createNewAlarm(formData)));

            root.removeChild(form);
        });
    }

    static buildAlarmInfo = () => {
        const infoContainer = document.createElement("div");
        root.appendChild(infoContainer);


        const alarmInfo = document.createElement("div");
        alarmInfo.textContent = `Alarm set to ${JSON.parse(localStorage.getItem("alarm")).time}`;
        infoContainer.appendChild(alarmInfo);

        const disableAlarmBtn = document.createElement("input");
        disableAlarmBtn.type = "submit";
        disableAlarmBtn.value = "Cancel Alarm";

        disableAlarmBtn.addEventListener("click", () => {
            localStorage.removeItem("alarm");

            root.removeChild(infoContainer);
        });

        infoContainer.appendChild(disableAlarmBtn);

        const lineBreak = document.createElement("br");
        infoContainer.appendChild(lineBreak);
    }
}