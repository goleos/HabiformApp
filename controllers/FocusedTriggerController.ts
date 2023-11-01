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

  newTrigger() {
      this.trigger = new Trigger()
  }

  dismissTrigger() {
    this.trigger = null;
  }
}

export const focusedTriggerController = new FocusedTriggerController();
