import { makeAutoObservable } from "mobx";
import Trigger from "../models/trigger";
import {triggersController } from "./TriggersController";

export class TriggerScheduleController {
  schedule: Trigger[] = [];

  constructor() {
    makeAutoObservable(this);
    this.formSchedule();
  }

  formSchedule(): void {
    this.schedule = triggersController.getTimedTriggers();
  }
}

export const triggerScheduleController = new TriggerScheduleController();
