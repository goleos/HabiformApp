import { makeAutoObservable, observable, action, set } from "mobx";
import * as SQLLite from "expo-sqlite";
import { dbInitQueries } from "../dbInit";

export class AppSettingsController {
  shouldRemindWithIntentions = true

  constructor() {
    makeAutoObservable(this);
    this.initialiseSettings();
  }

  initialiseSettings() {
    this.settings = {
      shouldRemindWithIntentions: true,
    };
  }

  // setSettings(settings) {
  //   console.log("changing");
  //   this.settings = settings;
  //   console.log(this.settings);
  // }

  setShouldRemindWithIntentions(value) {
    this.shouldRemindWithIntentions = value
  }
}

export const appSettingsController = new AppSettingsController();
