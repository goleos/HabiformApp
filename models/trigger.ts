type timeInHHMMFormat = string;
type weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type SimpleTrigger = {
    triggerEventID?: number;
    name: string;
    extraNotes: string;
    triggerType: "SimpleTrigger";
    timeIntervalStart: null;
    timeIntervalEnd: null;
    relevantWeekdays: null;
}

export type TimeIntervalTrigger = {
  triggerEventID?: number;
  name: string;
  extraNotes: string;
  triggerType: "TimeIntervalTrigger";
  timeIntervalStart: timeInHHMMFormat;
  timeIntervalEnd: timeInHHMMFormat;
  relevantWeekdays: Array<weekday>;
}

export type LocationTrigger = {
  triggerEventID?: number;
  name: string;
  extraNotes: string;
  triggerType: "LocationTrigger";
  timeIntervalStart: null;
  timeIntervalEnd: null;
  relevantWeekdays: null;
}

export type AutomationTrigger = {
  triggerEventID?: number;
  name: string;
  extraNotes: string;
  triggerType: "AutomationTrigger";
  timeIntervalStart: null;
  timeIntervalEnd: null;
  relevantWeekdays: null;
}

export type TriggerType = SimpleTrigger | TimeIntervalTrigger | LocationTrigger | AutomationTrigger;


class Trigger {
  triggerEventID?: number = null;
  name: string;
  extraNotes: string = "";
  triggerType: "SimpleTrigger" | "TimeIntervalTrigger" | "LocationTrigger" | "AutomationTrigger";
  timeIntervalStart: timeInHHMMFormat = null;
  timeIntervalEnd: timeInHHMMFormat = null;
  relevantWeekdays: Array<weekday> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // helped by https://stackoverflow.com/a/45688622
  constructor(obj: Object = null) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }

  startTimeAsDateObject(): Date {
    if (this.timeIntervalStart) {
      const startHour = parseInt(this.timeIntervalStart.split(":")[0]);
      const startMinute = parseInt(this.timeIntervalStart.split(":")[1]);
      let date = new Date();
      date.setHours(startHour);
      date.setMinutes(startMinute);
      return date;
    } else {
      return null;
    }
  }

  startTimeObjectOrDefault(): Date {
    const time = this.startTimeAsDateObject()
    return (time) ? time : new Date(2021, 12, 4, 7, 0);
  }

  endTimeObjectOrDefault(): Date {
    const time = this.endTimeAsDateObject()
    return (time) ? time : new Date(2021, 12, 4, 7, 0);
  }

  endTimeAsDateObject() {
    if (this.timeIntervalStart) {
      const endHour = parseInt(this.timeIntervalEnd.split(":")[0]);
      const endMinute = parseInt(this.timeIntervalEnd.split(":")[1]);
      let date = new Date();
      date.setHours(endHour);
      date.setMinutes(endMinute);
      return date;
    } else {
      return null;
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
  setStartTime(date) {
    this.timeIntervalStart = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  setEndTime(date) {
    this.timeIntervalEnd = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export default Trigger;
