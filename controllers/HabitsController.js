import { makeAutoObservable, runInAction } from "mobx";
import Habit, { hab } from "../models/habit";
import { dbController } from "./DatabaseController";
import habit from "../models/habit";
import {triggersController} from "./TriggersController";

export class HabitsController {
  habits = null;

  constructor() {
    makeAutoObservable(this);
    this.requestHabits();
  }

  getHabits(rows) {
    this.habits = [];
    console.log("getting habits");
    rows.forEach((obj) => {
      const habit = new Habit(obj);
      this.habits.push(habit);
    });
  }

  requestHabits() {
    dbController.getRowsOfTable("habit", (rows) => {
      this.getHabits(rows);
    });
  }

  markHabitAsComplete(habit) {}

  createNewHabit(habit, onSuccessCallback, onFailureCallback) {
    const sqlStatement = `INSERT OR REPLACE INTO habit (name, intentions, habitStatus, isFormed, extraNotes, shouldNotify, triggerEventID) 
VALUES ( ?, ?, ?, ?, ?, ?, ?) `;
    dbController.db.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        [
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
    const sqlStatement =
        `DELETE FROM habit WHERE habitID = ` + habitID;
    dbController.db.transaction((tx) => {
      tx.executeSql(
          sqlStatement,
          [],
          (txtObj, resultSet) => {
            console.log(
                "SQLLITE: Successfully deleted the habit with id: " +
                habitID
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
