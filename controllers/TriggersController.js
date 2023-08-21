import { makeAutoObservable, runInAction } from "mobx";
import Habit, { hab } from "../models/habit";
import { dbController } from "./DatabaseController";
import habit from "../models/habit";
import Trigger, { trig } from "../models/trigger";

export class TriggersController {
  triggers = [];
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

  getSoonestTriggers() {
    const now = new Date();
    const timedTriggers = this.getTimedTriggers();
    return timedTriggers.sort((trigger1, trigger2) => {
      return trigger1.startTimeAsDateObject() - now;
    });
  }

  getTimedTriggers() {
    let list = [...this.triggers];
    list = list.filter((trigger) => {
      return trigger.timeIntervalStart !== null;
    });
    list = list.sort((trigger1, trigger2) => {
      return (
        trigger1.startTimeAsDateObject() - trigger2.startTimeAsDateObject()
      );
    });
    return list;
  }

  requestTriggers() {
    dbController.getRowsOfTable("triggers", (rows) => {
      this.getTriggers(rows);
    });
  }

  createNewTrigger(trigger, onSuccessCallback, onFailureCallback) {
    const sqlStatement = `INSERT OR REPLACE INTO triggers (triggerEventID, name, extraNotes, timeIntervalStart, timeIntervalEnd) 
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
            "SQLLITE: Successfully inserted or replaced a trigger: " +
              trigger.name
          );
          onSuccessCallback();
        },
        (txtObj, error) => {
          console.log(
            "SQLLITE: Error inserting or replacing a trigger: " + error.message
          );
          onFailureCallback();
        }
      );
    });
    this.requestTriggers();
  }

  deleteTrigger(triggerEventId, onCompleteCallback) {
    const sqlStatement =
      `DELETE FROM triggers WHERE triggerEventID = ` + triggerEventId;
    dbController.db.transaction((tx) => {
      tx.executeSql(
        sqlStatement,
        [],
        (txtObj, resultSet) => {
          console.log(
            "SQLLITE: Successfully deleted the trigger with id: " +
              triggerEventId
          );
          onCompleteCallback();
        },
        (txtObj, error) => {
          console.log(
            "SQLLITE: Error deleting trigger with id: " + triggerEventId + ": "
          );
          console.log(error);
        }
      );
    });
    this.requestTriggers();
  }

  getTriggerById(triggerID) {
    return this.triggers.find((trigger) => {
      return trigger.triggerEventID === triggerID;
    });
  }
}

export const triggersController = new TriggersController();
