import { number } from "yup";
import {i18n} from "./localisation";

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const materialIconsNames = {
  trigger: 'clock-time-eight',
  habit: 'repeat'
}

export const welcomeMessages = [
  {
    number: 1,
    title: i18n.t("welcomeScreen1Title"),
    iconName: "emoticon-excited",
    text: i18n.t("welcomeScreen1Text"),
    isLastSlide: false,
  },
  {
    number: 2,
    title: i18n.t("welcomeScreen2Title"),
    iconName: "repeat",
    text: i18n.t("welcomeScreen2Text"),
    isLastSlide: false,
  },
  {
    number: 3,
    title: i18n.t("welcomeScreen3Title"),
    iconName: "clock-out",
    text: i18n.t("welcomeScreen3Text"),
    isLastSlide: false,
  },
  {
    number: 4,
    title: i18n.t("welcomeScreen4Title"),
    iconName: "format-list-checkbox",
    text: i18n.t("welcomeScreen4Text"),
    isLastSlide: false,
  },
  {
    number: 5,
    title: i18n.t("welcomeScreen5Title"),
    iconName: "play-circle",
    text: i18n.t("welcomeScreen5Text"),
    isLastSlide: true,
  },
];
