import HabitStatus from "./habitStatus";

class Habit {
  habitID: number;
  name: string;
  intentions: Array<string>;
  triggerEventID: number;
  extraNotes: string;
  habitStatus: HabitStatus = HabitStatus.Draft;
}

export default Habit;
