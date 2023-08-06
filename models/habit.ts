// documentation reference:
// https://www.typescriptlang.org/docs/handbook/2/classes.html

import HabitStatus from "./habitStatus";
import Trigger from "./trigger";

class Habit {
  habitID: number;
  name: string;
  intentions: Array<string> = [];
  // datesCompleted: Set<Date>;
  triggerEventID: number;
  extraNotes: string = '';
  habitStatus: HabitStatus = HabitStatus.Draft;
  shouldNotify: boolean = true;
  isFormed: boolean = false;

  // helped by https://stackoverflow.com/a/45688622
  constructor(obj: Object = null) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }

  addIntention(intention: string) {
    this.intentions.push(intention);
  }

}

export default Habit;

export const hab = new Habit();
hab.name = "Gym exercise";
hab.addIntention("Take bus");
hab.addIntention("Walk to gym");
