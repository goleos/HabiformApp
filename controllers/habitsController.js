import { makeAutoObservable, runInAction } from "mobx";
import Habit, { hab } from "../models/habit";
import { dbController } from "./DatabaseController";
import habit from "../models/habit";

export class HabitsController {
  habits = "null";

  constructor() {
    makeAutoObservable(this);
    this.requestHabits();
  }

  addHabits(rows) {
    this.habits = [];
    rows.forEach((obj) => {
      const habit = new Habit(obj);
      this.habits.push(habit);
    });
  }

  markHabitAsComplete(habit) {}

  createNewHabit(habit) {
    const sqlStatement = `INSERT INTO habit (name, intentions, habitStatus, isFormed, extraNotes, shouldNotify, triggerEventID) 
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
        },
        (txtObj, error) => {
          console.log("Error inserting a new habit: " + error.message);
        }
      );
    });
  }

  requestHabits() {
    dbController.getRowsOfTable("habit", (rows) => {
      this.addHabits(rows);
    });
  }
}

export const habitsController = new HabitsController();
