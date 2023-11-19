import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {currentDataModelVersion} from "../utils/constants";

export class AppSettingsController {
  shouldRemindWithIntentions = true;
  showIntroScreen = true;
  daysBeforeRequestCancelNotification = 3;
  dataModelVersion = 1;
  _storageKeyName = "appSettings";

  constructor() {
    makeAutoObservable(this);
  }

  initialiseSettings() {
    this.shouldRemindWithIntentions = true;
    this.showIntroScreen = true;
  }

  async setDaysBeforeRequestCancelNotification(val) {
    this.daysBeforeRequestCancelNotification = val;
    await this.loadIntoAsyncStorage();
  }

  async setDataModelVersion(val) {
    this.dataModelVersion = val;
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
      // this line might not be necessary, but it's here just in case
      if (!obj.hasOwnProperty("dataModelVersion")) {
        this.dataModelVersion = 1;
      }
    } else {
      // If there is no data in AsyncStorage, we opened the app for the first time. Set the current data model version.
      this.dataModelVersion = currentDataModelVersion;
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
