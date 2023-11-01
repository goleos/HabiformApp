import Trigger from "../models/trigger";
import { makeAutoObservable } from "mobx";
import Habit from "../models/habit";
import { habitsController } from "./HabitsController";

export class FocusedTriggerController {
  trigger?: Trigger = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTrigger(trigger: Trigger) {
    this.trigger = trigger;
  }

  newTrigger() {
    this.trigger = new Trigger();
  }

  dismissTrigger() {
    this.trigger = null;
  }

  getLinkedHabits(): Habit[] {
    if (this.trigger === null) {
      throw new Error(
        "Focused trigger is null while trying to access its linked habits"
      );
    }
    return habitsController.habits.filter(
      (habit) => habit.triggerEventID === this.trigger.triggerEventID
    );
  }
}

export const focusedTriggerController = new FocusedTriggerController();
