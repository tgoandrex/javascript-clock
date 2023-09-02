import { Alarm } from "./src/app/Alarm";
import { Analog } from "./src/app/Analog";

export const run = () => {
    if(localStorage.getItem("alarm")) {
        Alarm.buildAlarmInfo();
    } else {
        Alarm.buildAlarmForm();
    }
    
    Analog.buildClock();
};