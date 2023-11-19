export const dbInitQueries = [
  `
    CREATE TABLE IF NOT EXISTS triggers (
    triggerEventID Integer Primary Key AUTOINCREMENT,
    name VARCHAR NOT NULL,
    extraNotes TEXT,
    triggerType TEXT,
    timeIntervalStart TEXT,
    timeIntervalEnd TEXT,
    relevantWeekdays TEXT
    );
    `,
  `
    CREATE TABLE IF NOT EXISTS habit (
    habitID Integer Primary Key AUTOINCREMENT,
    name VARCHAR NOT NULL,
    intentions JSON,
    -- helped by: https://stackoverflow.com/questions/5299267/how-to-create-enum-type-in-sqlite
    habitStatus TEXT CHECK( habitStatus IN ('draft','active','archived') ) DEFAULT "draft",
    isFormed INTEGER DEFAULT "0" NOT NULL,
    extraNotes TEXT,
    shouldNotify INTEGER DEFAULT "1" NOT NULL,
    triggerEventID INTEGER,
    FOREIGN KEY(triggerEventID) REFERENCES triggers(id)
    );
    `,
];
