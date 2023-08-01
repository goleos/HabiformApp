class Trigger {
  triggerEventID: number;
  name: string;
  intentions: Array<string>;
  extraNotes: string;
  timeIntervalStart: string;
  timeIntervalEnd: string;
  relevantWeekdays: Array<string>;
}

export default Trigger;

export const trig = new Trigger()
trig.name = "Test name"
