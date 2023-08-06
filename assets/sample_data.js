export const sampleHabits = [
  {
    habitID: 1000,
    triggerEventID: 1000,
    name: "Exercise in the gym",
    intentions: [
      "Take the U1A bus",
      "Get off at Sports Centre",
      "Walk to the gym and do 10 pull ups",
    ],
    extraNotes: "You should spend at least 30 minutes in the gym",
    habitStatus: "active",
    shouldNotify: true,
    isFormed: false,
  },
  {
    habitID: 1001,
    name: "Meditate",
    extraNotes: ` I need to decide on:
- when i want to meditate
- how long to meditate for
`,
    habitStatus: "draft",
  },
  {
    triggerEventID: 1001,
    habitID: 1002,
    name: "Cycle to work",
    extraNotes: "I want to stop using my car and use my bike instead",
    habitStatus: "active",
    shouldNotify: false,
    isFormed: true
  },
  {
    triggerEventID: 1002,
    habitID: 1003,
    name: "Drink a glass of water",
    habitStatus: "archived",
    shouldNotify: false,
    isFormed: false
  }
];

export const sampleTriggers = [
  {
    triggerEventID: 1000,
    name: "Finishing the work day",
    timeIntervalStart: "17:00",
    timeIntervalEnd: "18:00",
    relevantWeekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  {
    triggerEventID: 1001,
    name: "Leaving home for work"
  },
  {
    triggerEventID: 1002,
    name: "Starting breakfast"
  }
];
