class Trigger {
  triggerEventID: number;
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
}

export default Trigger;

export const trig = new Trigger();
trig.name = "Finishing dinner";
trig.timeIntervalStart = "17:00";
trig.timeIntervalEnd = "18:00";
