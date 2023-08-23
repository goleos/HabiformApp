import { makeAutoObservable, observable, action, set } from "mobx";
import * as SQLLite from "expo-sqlite";
import { dbInitQueries } from "../dbInit";

export class AppSettingsController {
  shouldRemindWithIntentions = true;
  showIntroScreen = true;

  constructor() {
    makeAutoObservable(this);
    this.initialiseSettings();
  }

  initialiseSettings() {
    this.settings = {
      shouldRemindWithIntentions: true,
    };
  }

  setShouldRemindWithIntentions(value) {
    this.shouldRemindWithIntentions = value;
  }

  dismissIntroScreen() {
    this.showIntroScreen = false;
  }
}

export const appSettingsController = new AppSettingsController();
