// documentation reference:
// https://www.typescriptlang.org/docs/handbook/2/classes.html

import HabitStatus from "./habitStatus";
import Trigger from "./trigger";

class Habit {
  habitID: number;
  name: string;
  intentions: Array<string> = [];
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


export const hab = new Habit()
hab.name = "Gym exercise"
hab.addIntention('Take bus')
hab.addIntention('Walk to gym')
