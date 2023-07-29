class TriggerEvent {
  triggerEventID: number;
  name: string;
  intentions: Array<string>;
  extraNotes: string;
  timeIntervalStart: string;
  timeIntervalEnd: string;
  relevantWeekdays: Array<string>;
}

export default TriggerEvent;
