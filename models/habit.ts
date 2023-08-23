// documentation reference:
// https://www.typescriptlang.org/docs/handbook/2/classes.html

import HabitStatus from "./habitStatus";

class Habit {
  habitID: number = null;
  name: string;
  intentions: Array<string> = [];
  // datesCompleted: Set<Date>;
  triggerEventID: number;
  extraNotes: string = "";
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

  isActive() {
    return this.habitStatus === HabitStatus.Active;
  }

  produceNotification() {
    const reminderTitle = this.name;
    let reminder;

    reminder =
      this.intentions.length === 0
        ? {
            title: reminderTitle,
            body: "Remember to complete this habit today",
          }
        : {
            title: reminderTitle,
            body: "Let's start with " + '"' + this.intentions[0] + '"',
          };
    return reminder;
  }
}

export default Habit;

export const hab = new Habit();
hab.name = "Gym exercise";
hab.addIntention("Take bus");
hab.addIntention("Walk to gym");
