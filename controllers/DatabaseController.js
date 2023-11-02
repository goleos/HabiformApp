// example from https://mobx.js.org/react-integration.html
// mobx tutorial: https://mobx.js.org/react-integration.html

import { makeAutoObservable } from "mobx";
import * as SQLLite from "expo-sqlite";
import { dbInitQueries } from "../utils/dbInit";

export class DatabaseController {
  db = SQLLite.openDatabase("test-db.db");

  constructor() {
    makeAutoObservable(this);
    this.initialiseDatabase();
  }

  initialiseDatabase() {
    this.db.transaction((tx) => {
      dbInitQueries.forEach((query) => {
        tx.executeSql(
          query,
          null,
          (txtObj, result) => console.info("SQLLITE: Successful init query"),
          (txtObj, error) =>
            console.log(
              "Error initialising the database: " +
                error.message +
                txtObj.toString()
            )
        );
      });

      // this.db.transaction((tx) => {
      //   tx.executeSql("insert into names (name) values ('hello')");
      // });
    });
  }

  getRowsOfTable(tableName, resultCallback) {
    this.db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from " + tableName,
          null,
          (txtObj, resultSet) => {
            console.info(
              "SQLLITE: Successfully retrieved data from table '" +
                tableName +
                "'"
            );
            resultCallback(resultSet.rows._array);
          }
        );
      },
      (txtObj, error) => console.log(txtObj)
    );
  }

  deleteEverything() {
    this.db.transaction(
      (tx) => {
        tx.executeSql("delete from triggers", null, (txtObj, resultSet) => {
          console.log("Successfully deleted the triggers table");
        });
      },
      (txtObj, error) => console.log(txtObj)
    );
    this.db.transaction(
      (tx) => {
        tx.executeSql("delete from habit", null, (txtObj, resultSet) => {
          console.log("Successfully deleted the habit table");
        });
      },
      (txtObj, error) => console.log(txtObj)
    );
  }

  // insert(tableName, object) {
  //   const serialised = JSON.stringify(object);
  //   const sqlStatement =
  //     "INSERT INTO " +
  //     tableName +
  //     " (" +
  //     serialised.keys().join(", ") +
  //     ") VALUES (" +
  //     serialised.values().join(", ") +
  //     ")";
  //   console.log(sqlStatement);
  //   this.db.transaction(
  //     (tx) => {
  //       tx.executeSql(sqlStatement, null, (txtObj, resultSet) => {
  //         console.log("Successfully retrieved data from database");
  //         resultCallback(resultSet.rows._array);
  //       });
  //     },
  //     (txtObj, error) => console.log(txtObj)
  //   );
  // }

  getTables() {
    this.db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%';",
        null,
        (txtObj, resultSet) => {
          console.log(resultSet.rows._array);
        }
      );
    });
  }
}

export const dbController = new DatabaseController();
