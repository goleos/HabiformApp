// This Code is adapted from:
// https://docs.expo.dev/versions/latest/sdk/notifications/

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { makeAutoObservable } from "mobx";
import { appSettingsController } from "./AppSettingsController";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationsController {
  expoPushToken = "";
  notifications = [];
  prolongedNotifications = [];

  constructor() {
    makeAutoObservable(this);
    this.registerForPushNotificationsAsync().then((token) => {
      this.expoPushToken = token;
      this.requestAllScheduledNotifications();
    });
  }

  setNotifications(notifications) {
    this.notifications = notifications;
  }

  requestAllScheduledNotifications() {
    let notifications;
    Notifications.getAllScheduledNotificationsAsync()
      .then((value) => {
        console.log("Getting notifications");
        console.log(value);
        this.setNotifications(value);
        this.prolongedNotifications = value.filter((notif) => {
          const startDate = Date.parse(notif.content.data.startTime);
          const daysPassed = (new Date() - startDate) / 1000 / 60 / 60 / 24;
          console.log(daysPassed);
          return (
            daysPassed >
            appSettingsController.daysBeforeRequestCancelNotification
          );
        });
      })
      .catch((reason) => {
        console.log("error getting notifications " + reason);
      });
  }

  async cancelPushNotification(identifier) {
    return await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  async schedulePushNotification(content, when, identifier) {
    return await Notifications.scheduleNotificationAsync({
      content: content,
      trigger: when,
      identifier: identifier,
    });
  }

  async registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
}

export const notificationsController = new NotificationsController();
