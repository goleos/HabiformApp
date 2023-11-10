// documentation reference:
// https://www.typescriptlang.org/docs/handbook/2/classes.html

import HabitStatus from "./habitStatus";
import { appSettingsController } from "../controllers/AppSettingsController";
import {i18n} from "../utils/localisation";

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

  notificationIdentifier() {
    return "habit " + this.habitID;
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
      this.intentions.length !== 0 &&
      appSettingsController.shouldRemindWithIntentions
        ? {
            title: reminderTitle,
            body: i18n.t("intentionNotificationBody") + ' "' + this.intentions[0] + '"',
            data: {
              startTime: new Date().toJSON(),
              habit: this,
            },
          }
        : {
            title: reminderTitle,
            body: i18n.t("noIntentionNotificationBody"),
            data: {
              startTime: new Date().toJSON(),
              habit: this,
            },
          };
    return reminder;
  }
}

export default Habit;

export const hab = new Habit();
hab.name = "Gym exercise";
hab.addIntention("Take bus");
hab.addIntention("Walk to gym");
