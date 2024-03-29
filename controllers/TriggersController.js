import {makeAutoObservable} from "mobx";
import {dbController} from "./DatabaseController";
import Trigger from "../models/trigger";

export class TriggersController {
    triggers = [];

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

    getTimedTriggers() {
        let list = this.triggers !== null ? [...this.triggers] : [];
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
        const sqlStatement = `INSERT OR REPLACE INTO triggers (triggerEventID, name, extraNotes, timeIntervalStart, timeIntervalEnd, triggerType) 
VALUES ( ?, ?, ?, ?, ?, ?) `;

        dbController.db.transaction((tx) => {
            tx.executeSql(
                sqlStatement,
                [
                    trigger.triggerEventID,
                    trigger.name,
                    trigger.extraNotes,
                    trigger.timeIntervalStart,
                    trigger.timeIntervalEnd,
                    trigger.triggerType
                ],
                (txtObj, resultSet) => {
                    console.log(
                        "SQLLITE: Successfully inserted or replaced a trigger: " +
                        trigger.name
                    );
                    onSuccessCallback(resultSet["insertId"]);
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
