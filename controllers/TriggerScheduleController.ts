import { makeAutoObservable } from "mobx";
import Trigger from "../models/trigger";
import { triggersController } from "./TriggersController";

export class TriggerScheduleController {
  schedule: Trigger[] = [];

  constructor() {
    makeAutoObservable(this);
    this.formSchedule();
  }

  formSchedule(): void {
    const now = new Date();
    const timedTriggers =
      triggersController !== undefined
        ? triggersController.getTimedTriggers()
        : [];
    const withoutPastTriggers: Trigger[] = timedTriggers.filter(
      (trigger: Trigger) => {
        return trigger.endTimeAsDateObject() > now;
      }
    );
    const sorted = withoutPastTriggers.sort((trigger1, trigger2) => {
      // helped by this answer: https://stackoverflow.com/a/11796365 [Accessed 29 Aug]
      // @ts-ignore
      const diff1 = Math.abs(now - trigger1.startTimeAsDateObject());
      // @ts-ignore
      const diff2 = Math.abs(now - trigger2.startTimeAsDateObject());
      // console.log("diff for " + trigger1.name + " = ");
      // console.log(
      //   "trigger time: " + trigger1.startTimeAsDateObject().toString()
      // );
      return diff1 - diff2;
    });
    this.schedule = sorted;
  }
}

export const triggerScheduleController = new TriggerScheduleController();
