import Trigger from "../models/trigger";
import { makeAutoObservable } from "mobx";
import Habit from "../models/habit";
import {
  addNotificationToHabit,
  cancelHabitNotification,
  habitsController,
  setNotifications,
} from "./HabitsController";
import { triggersController } from "./TriggersController";

type GeneralCallbackType = () => void;
type GeneralCallbackTypeWithMessage = (message: string) => void;

export class FocusedTriggerController {
  trigger?: Trigger = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTrigger(trigger: Trigger) {
    this.trigger = trigger;
  }

  newTrigger(triggerType: "SimpleTrigger" | "TimeIntervalTrigger" | "LocationTrigger" | "AutomationTrigger") {
    const trigger = new Trigger();
    trigger.triggerType = triggerType;
    switch (triggerType) {
        case "SimpleTrigger":
          break;
        case "TimeIntervalTrigger":
            trigger.timeIntervalStart = "07:00";
            trigger.timeIntervalEnd = "08:00";
            trigger.relevantWeekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            break;
        case "LocationTrigger":
            break;
        case "AutomationTrigger":
            break;
        default:
            throw new Error("Unknown trigger type when creating new trigger");
    }
    this.trigger = trigger;
  }

  dismissTrigger() {
    this.trigger = null;
  }

  delete(onCompleteCallback: GeneralCallbackType, onFailCallback: GeneralCallbackTypeWithMessage) {
    if (this.trigger === null) {
      throw new Error("Focused trigger is null while trying to delete it");
    }
    if (this.getLinkedHabits().length > 0) {
      onFailCallback("Can't delete trigger. You must first unlink all habits from this trigger.")
      return
    }
    triggersController.deleteTrigger(
      this.trigger.triggerEventID,
      onCompleteCallback
    );
  }

  insertOrUpdate(
    newTrigger: Trigger,
    onSuccessCallback: GeneralCallbackType,
    onFailCallback: GeneralCallbackType
  ): void {
    triggersController.createNewTrigger(
      newTrigger,
      (insertID) => {
        if (!this.trigger.triggerEventID) {
          newTrigger.triggerEventID = insertID;
        }
        this.setTrigger(newTrigger);
        // Here we are making so that notifications update too
        const linkedHabitsWithActiveNotifications =
          this.getLinkedHabits().filter((habit) => {
            return habit.shouldNotify == true;
          });
        linkedHabitsWithActiveNotifications.forEach((habit) => {
          cancelHabitNotification(habit);
          addNotificationToHabit(habit, this.trigger);
        });
        onSuccessCallback();
      },
      onFailCallback
    );
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
