import { makeAutoObservable } from "mobx";
import Habit from "../models/habit";
import habit from "../models/habit";
import { dbController } from "./DatabaseController";
import { triggersController } from "./TriggersController";
import HabitStatus from "../models/habitStatus";
import { notificationsController } from "./NotificationsController";

export function setNotifications(habit) {
  if (notificationsController.notifications !== null) {
    // console.log("not null: " + notificationsController.notifications);
    // console.log("notification controller ready");
    if (habit.isActive()) {
      if (!habit.shouldNotify) {
        cancelHabitNotification(habit);
      } else {
        if (getHabitNotificationInfo(habit)) {
          console.log(
            "Notifications: found existing notification for " +
              habit.name +
              ". Not scheduling a new one."
          );
        } else {
          if (habit.shouldNotify) {
            addNotificationToHabit(habit);
          }
        }
      }
    }
  } else {
    // console.log("notification controller still loading");
  }
}

export function addNotificationToHabit(habit, specificTrigger) {
  const trigger = (!specificTrigger) ? triggersController.getTriggerById(habit.triggerEventID) : specificTrigger;
  if (trigger.timeIntervalStart !== null) {
    const triggerTime = trigger.startTimeAsDateObject();
    console.info(
      "Notifications: Scheduling notification for habit '" +
        habit.name +
        "' at " +
        triggerTime.toString()
    );
    notificationsController
      .schedulePushNotification(
        habit.produceNotification(),
        {
          hour: triggerTime.getHours(),
          minute: triggerTime.getMinutes(),
          repeats: true,
        },
        habit.notificationIdentifier()
      )
      .then((r) => {
        console.info(
          "Notifications: Successfully scheduled a notification with notification ID: " +
            r +
            ' (habit "' +
            habit.name +
            '"'
        );
      });
  }
}

function getHabitNotificationInfo(habit) {
  if (notificationsController.notifications !== null) {
    return notificationsController.notifications.find((notif) => {
      return notif.identifier === habit.notificationIdentifier();
    });
  }
}

export function cancelHabitNotification(habit) {
  notificationsController
    .cancelPushNotification(habit.notificationIdentifier())
    .catch((reason) => {
      console.log("failed to cancel notifications");
      console.log(reason);
    })
    .then(() => {
      console.info(
        "Notifications: Successfully canceled notification with id " +
          habit.notificationIdentifier() +
          ": " +
          habit.name
      );
    });
}

export class HabitsController {
  habits = [];

  constructor() {
    makeAutoObservable(this);
    this.requestHabits();
  }

  getHabits(rows) {
    this.habits = [];
    rows.forEach((obj) => {
      const habit = new Habit({
        ...obj,
        intentions: JSON.parse(obj.intentions),
      });
      this.habits.push(habit);
      setNotifications(habit);
    });
  }

  requestHabits() {
    dbController.getRowsOfTable("habit", (rows) => {
      this.getHabits(rows);
    });
  }

  getActiveHabits() {
    return this.habits.filter((habit) => {
      return habit.habitStatus === HabitStatus.Active;
    });
  }

  getTimedActiveHabits() {
    const activeHabits = this.getActiveHabits();
    return activeHabits.filter((habit) => {
      return (
        triggersController.getTriggerById(habit.triggerEventID)
          .timeIntervalStart !== null
      );
    });
  }

  getUntimedActiveHabits() {
    const activeHabits = this.getActiveHabits();
    return activeHabits.filter((habit) => {
      return (
        triggersController.getTriggerById(habit.triggerEventID)
          .timeIntervalStart === null
      );
    });
  }

  markHabitAsComplete(habit) {}

  createNewHabit(habit, onSuccessCallback, onFailureCallback) {
    const sqlStatement = `INSERT OR REPLACE INTO habit (habitID, name, intentions, habitStatus, isFormed, extraNotes, shouldNotify, triggerEventID) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;
    dbController.db.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        [
          habit.habitID,
          habit.name,
          JSON.stringify(habit.intentions),
          habit.habitStatus,
          Number(habit.isFormed),
          habit.extraNotes,
          Number(habit.shouldNotify),
          habit.triggerEventID,
        ],
        (txtObj, resultSet) => {
          console.info("Successfully inserted a new habit: " + habit.name);
          onSuccessCallback();
        },
        (txtObj, error) => {
          console.error("Error inserting a new habit: " + error.message);
          onFailureCallback();
        }
      );
    });
    this.requestHabits();
  }

  deleteHabit(habitID, onCompleteCallback) {
    const sqlStatement = `DELETE FROM habit WHERE habitID = ` + habitID;
    dbController.db.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        [],
        (txtObj, resultSet) => {
          console.info(
            "SQLLITE: Successfully deleted the habit with id: " + habitID
          );
          onCompleteCallback();
        },
        (txtObj, error) => {
          console.log(
            "SQLLITE: Error deleting habit with id: " + habitID + ": "
          );
          console.log(error);
        }
      );
    });
    this.requestHabits();
  }
}

export const habitsController = new HabitsController();
