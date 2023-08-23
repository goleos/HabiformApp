import { makeAutoObservable } from "mobx";
import Habit from "../models/habit";
import habit from "../models/habit";
import { dbController } from "./DatabaseController";
import { triggersController } from "./TriggersController";
import HabitStatus from "../models/habitStatus";
import { notificationsController } from "./NotificationsController";
import { DailyTriggerInput } from "expo-notifications";

function setNotifications(habit) {
  if (habit.isActive()) {
    const notificationIdentifier = "habit " + habit.habitID;
    if (habit.shouldNotify) {
      const trigger = triggersController.getTriggerById(habit.triggerEventID);
      if (trigger.timeIntervalStart !== null) {
        const triggerTime = trigger.startTimeAsDateObject();
        console.log(
          "Scheduling notification for habit '" +
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
            notificationIdentifier
          )
          .then((r) => {
            console.log(
              "Successfully scheduled a notification with response: "
            );
            console.log(r);
          });
      }
    } else {
      notificationsController
        .cancelPushNotification(notificationIdentifier)
        .catch((reason) => {
          console.log("failed to cancel notifications");
          console.log(reason);
        });
    }
  }
}

export class HabitsController {
  habits = null;

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
          console.log("Successfully inserted a new habit: " + habit.name);
          onSuccessCallback();
        },
        (txtObj, error) => {
          console.log("Error inserting a new habit: " + error.message);
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
          console.log(
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
