export const dbInitQueries = [
  `
    CREATE TABLE IF NOT EXISTS triggers (
    id Integer Primary Key Autoincrement,
    name VARCHAR NOT NULL
    );
    `,
  `
    CREATE TABLE IF NOT EXISTS habits (
    id Integer Primary Key Autoincrement,
    name VARCHAR NOT NULL,
    intentions JSON,
    -- helped by: https://stackoverflow.com/questions/5299267/how-to-create-enum-type-in-sqlite
    habit_status TEXT CHECK( habit_status IN ('draft','active','archived') ) DEFAULT "draft",
    is_formed INTEGER DEFAULT "0" NOT NULL,
    extra_notes TEXT,
    should_notify INTEGER DEFAULT "1",
    trigger_event_id INTEGER,
    FOREIGN KEY(trigger_event_id) REFERENCES triggers(id)
    );
    `,
];
