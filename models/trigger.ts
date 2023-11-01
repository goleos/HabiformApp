class Trigger {
  triggerEventID?: number = null;
  name: string;
  extraNotes: string = "";
  timeIntervalStart: string = null;
  timeIntervalEnd: string = null;
  relevantWeekdays: Array<string> = [
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

  startTimeAsDateObject() {
    const startHour = parseInt(this.timeIntervalStart.split(":")[0]);
    const startMinute = parseInt(this.timeIntervalStart.split(":")[1]);
    let date = new Date()
    date.setHours(startHour)
    date.setMinutes(startMinute)
    return date
  }

  endTimeAsDateObject() {
    const endHour = parseInt(this.timeIntervalEnd.split(":")[0]);
    const endMinute = parseInt(this.timeIntervalEnd.split(":")[1]);
    let date = new Date()
    date.setHours(endHour)
    date.setMinutes(endMinute)
    return date
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
  setStartTime(date) {
    this.timeIntervalStart = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  setEndTime(date) {
    this.timeIntervalEnd = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }
}

export default Trigger;

export const trig = new Trigger();
trig.name = "Finishing dinner";
trig.timeIntervalStart = "17:00";
trig.timeIntervalEnd = "18:00";
