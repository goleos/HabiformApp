// documentation reference:
// https://www.typescriptlang.org/docs/handbook/2/classes.html

import HabitStatus from "./habitStatus";

class Habit {
  habitID: number;
  name: string;
  intentions: Array<string>;
  datesCompleted: Set<Date>;
  triggerEventID: number;
  extraNotes: string;
  habitStatus: HabitStatus = HabitStatus.Draft;
  shouldNotify: boolean = true;
  isFormed: boolean = false;

  addIntention(intention: string) {
    this.intentions.push(intention);
  }

  markAsComplete(date: Date) {
    this.datesCompleted = this.datesCompleted.add(date);
  }
}

export default Habit;
