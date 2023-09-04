import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AppSettingsController {
  shouldRemindWithIntentions = true;
  showIntroScreen = true;
  daysBeforeRequestCancelNotification = 3;
  _storageKeyName = "appSettings";

  constructor() {
    makeAutoObservable(this);
  }

  initialiseSettings() {
    this.shouldRemindWithIntentions = true;
    this.showIntroScreen = true;
  }

  async setDaysBeforeRequestCancelNotification(val) {
    console.log("nononowe");
    this.daysBeforeRequestCancelNotification = val;
    await this.loadIntoAsyncStorage();
  }

  async resetSettings() {
    this.initialiseSettings();
    await this.loadIntoAsyncStorage();
  }

  async loadIntoAsyncStorage() {
    console.log("Settings: uploading app settings data to AsyncStorage");
    const data = JSON.stringify(this);
    return await AsyncStorage.setItem(this._storageKeyName, data);
  }

  async loadFromAsyncStorage() {
    console.info("Settings: downloading app settings data");
    const value = await AsyncStorage.getItem(this._storageKeyName);
    if (value !== null) {
      const obj = JSON.parse(value);
      Object.assign(this, obj);
    } else {
      await this.resetSettings();
    }
  }

  async setShouldRemindWithIntentions(value) {
    this.shouldRemindWithIntentions = value;
    await this.loadIntoAsyncStorage();
  }

  async setShowIntroScreen(value) {
    this.showIntroScreen = value;
    await this.loadIntoAsyncStorage();
  }
}

export const appSettingsController = new AppSettingsController();
