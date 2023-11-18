export const sampleHabitsEnglish = [
  {
    habitID: 1000,
    triggerEventID: 1000,
    name: "Exercise in the gym",
    intentions: [
      "Take bus to gym",
      "Get off at the Gym",
      "Walk to the gym and do 10 pull ups",
    ],
    extraNotes: "You should spend at least 30 minutes in the gym",
    habitStatus: "active",
    shouldNotify: false,
    isFormed: false,
  },
  //   {
  //     habitID: 1001,
  //     name: "Meditate",
  //     extraNotes: ` I need to decide on:
  // - when i want to meditate
  // - how long to meditate for
  // `,
  //     habitStatus: "draft",
  //   },
  {
    habitID: 1001,
    name: "Eat a vegetable",
    habitStatus: "draft",
    triggerEventID: 1002,
  },
  {
    triggerEventID: 1001,
    habitID: 1002,
    name: "Cycle to work",
    extraNotes: "",
    habitStatus: "active",
    shouldNotify: false,
    isFormed: true,
    intentions: ["Get the bike from garage", "Take the bike lock with you"],
  },
  {
    triggerEventID: 1002,
    habitID: 1003,
    name: "Drink a glass of water",
    habitStatus: "archived",
    shouldNotify: false,
    isFormed: false,
  },
  {
    triggerEventID: 1003,
    habitID: 1004,
    name: "Check driving license",
    extraNotes:
      "Make sure to have your driving license when you are about to drive a car",
    habitStatus: "active",
  }
];

export const sampleTriggersEnglish = [
  {
    triggerEventID: 1000,
    name: "Finishing work day",
    timeIntervalStart: "17:00",
    timeIntervalEnd: "18:00",
    extraNotes: "When I leave office",
    relevantWeekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    triggerEventID: 1001,
    name: "Leaving home for work",
    timeIntervalStart: "07:00",
    timeIntervalEnd: "07:30",
    relevantWeekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    triggerEventID: 1002,
    name: "Starting breakfast",
    timeIntervalStart: "06:30",
    timeIntervalEnd: "06:40",
    relevantWeekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    triggerEventID: 1003,
    name: "Entering my car",
  },
];

export const sampleTriggersRussian = [
  {
    triggerEventID: 1000,
    name: "Конец рабочего дня",
    timeIntervalStart: "17:00",
    timeIntervalEnd: "18:00",
    extraNotes: "Когда я выхожу с работы",
    relevantWeekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    triggerEventID: 1001,
    name: "Выхожу из дома на работу",
    timeIntervalStart: "07:00",
    timeIntervalEnd: "07:30",
    relevantWeekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    triggerEventID: 1002,
    name: "Начинаю завтракать",
    timeIntervalStart: "06:30",
    timeIntervalEnd: "06:40",
    relevantWeekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    triggerEventID: 1003,
    name: "Захожу в машину",
  },
];

export const sampleHabitsRussian = [
  {
    habitID: 1000,
    triggerEventID: 1000,
    name: "Тренировка в спортзале",
    intentions: [
      "Доехать до зала",
      "Зайти в зал и сделать 10 подтягиваний",
    ],
    extraNotes: "Нужно провести хотя бы 10 минут в спортзале",
    habitStatus: "active",
    shouldNotify: false,
    isFormed: false,
  },
  {
    habitID: 1001,
    name: "Съесть овощь",
    habitStatus: "draft",
    triggerEventID: 1002,
  },
  {
    triggerEventID: 1001,
    habitID: 1002,
    name: "Поехать на велосипеде на работу",
    extraNotes: "",
    habitStatus: "active",
    shouldNotify: false,
    isFormed: true,
    intentions: ["Выгнать велосипед из дома", "Взять с собой замок"],
  },
  {
    triggerEventID: 1002,
    habitID: 1003,
    name: "Выпить стакан воды",
    habitStatus: "archived",
    shouldNotify: false,
    isFormed: false,
  },
  {
    triggerEventID: 1003,
    habitID: 1004,
    name: "Проверить водительские права",
    extraNotes:
        "",
    habitStatus: "active",
  }
];
