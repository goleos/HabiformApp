import { number } from "yup";

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

export const welcomeMessages = [
  {
    number: 1,
    title: "Thank you for downloading this app!",
    iconName: "emoticon-excited",
    text: "Building a good habit is difficult. This app is built on scientific findings that could help with forming a habit",
    isLastSlide: false,
  },
  {
    number: 2,
    title: "How to form a strong habit?",
    iconName: "repeat",
    text: "A reliable way of creating a habit is to do the habit in response to something you already do regularly. This is known as a trigger event, or simply, a trigger.\n\nFor example, getting into your car is a trigger for you to put on the seatbelt.\n\nIf we can train ourselves to do the habit in response to a trigger, we can achieve a more frequent repetition of the action.",
    isLastSlide: false,
  },
  {
    number: 3,
    title: "How to choose a good trigger?",
    iconName: "clock-out",
    text: "Not every action you are already doing would make a good trigger. The best triggers are those that you do every day, regardless of whether it is a weekend or weekday, whether it is at home or on holiday.\n\nFor example, having dinner would be a reliable trigger since you do it every day ",
    isLastSlide: false,
  },
  {
    number: 4,
    title: "Make your habit intentions clear",
    iconName: "format-list-checkbox",
    text: "The app lets you add implementation intentions to your habits. Think of them as steps you need to do in order to complete the habit.\n\nFor example, the 'Go to the gym' habit could have the following intentions: take a bus to the sports centre, walk into the gym, start by doing 10 pull ups.\n\nIt is important to be precise in your habit intentions.",
    isLastSlide: false,
  },
  {
    number: 5,
    title: "Let's begin",
    iconName: "play-circle",
    text: "You are now ready to start using the app. Use the app as a tool to achieve your habit goals. But remember that no app could ever do your habits for you",
    isLastSlide: true,
  },
];
