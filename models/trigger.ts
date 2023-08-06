class Trigger {
  triggerEventID: number;
  name: string;
  extraNotes: string = '';
  timeIntervalStart: string;
  timeIntervalEnd: string;
  relevantWeekdays: Array<string> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
}

export default Trigger;

export const trig = new Trigger();
trig.name = "Finishing dinner";
trig.timeIntervalStart = "17:00";
trig.timeIntervalEnd = "18:00";
