import { makeAutoObservable, runInAction } from "mobx";
import Habit, { hab } from "../models/habit";
import { dbController } from "./DatabaseController";
import habit from "../models/habit";
import Trigger, { trig } from "../models/trigger";

export class TriggersController {
  triggers = null;
  focusedTrigger = null;

  constructor() {
    makeAutoObservable(this);
    this.requestTriggers();
  }

  getTriggers(rows) {
    this.triggers = [];
    rows.forEach((obj) => {
      const trigger = new Trigger(obj);
      this.triggers.push(trigger);
    });
  }

  requestTriggers() {
    dbController.getRowsOfTable("triggers", (rows) => {
      this.getTriggers(rows);
    });
  }

  createNewTrigger(trigger, onSuccessCallback, onFailureCallback) {
    const sqlStatement = `INSERT INTO triggers (triggerEventID, name, extraNotes, timeIntervalStart, timeIntervalEnd) 
VALUES ( ?, ?, ?, ?, ?) `;

    dbController.db.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        [
          trigger.triggerEventID,
          trigger.name,
          trigger.extraNotes,
          trigger.timeIntervalStart,
          trigger.timeIntervalEnd,
        ],
        (txtObj, resultSet) => {
          console.log(
            "SQLLITE: Successfully inserted a new trigger: " + trigger.name
          );
          onSuccessCallback();
        },
        (txtObj, error) => {
          console.log(
            "SQLLITE: Error inserting a new trigger: " + error.message
          );
          onFailureCallback();
        }
      );
    });
    this.requestTriggers();
  }
}

export const triggersController = new TriggersController();
