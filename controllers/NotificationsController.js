// This Code is adapted from:
// https://docs.expo.dev/versions/latest/sdk/notifications/

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { makeAutoObservable } from "mobx";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationsController {
  expoPushToken = "";

  constructor() {
    makeAutoObservable(this);
    this.registerForPushNotificationsAsync().then(
      (token) => (this.expoPushToken = token)
    );
  }

  async cancelPushNotification(identifier) {
    await Notifications.cancelScheduledNotificationAsync(identifier);
  }

  async schedulePushNotification(content, when, identifier) {
    await Notifications.scheduleNotificationAsync({
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
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
}

export const notificationsController = new NotificationsController();
