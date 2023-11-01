import Trigger from "../models/trigger";
import { makeAutoObservable } from "mobx";

export class FocusedTriggerController {
  trigger?: Trigger = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTrigger(trigger: Trigger) {
    this.trigger = trigger;
  }

  dismissTrigger() {
    this.trigger = null;
  }
}

export const focusedTriggerController = new FocusedTriggerController();
