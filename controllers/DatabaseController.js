// example from https://mobx.js.org/react-integration.html
// mobx tutorial: https://mobx.js.org/react-integration.html

import { makeAutoObservable, observable, action } from "mobx";
import * as SQLLite from "expo-sqlite";
import { dbInitQueries } from "../dbInit";

export class DatabaseController {
  db = SQLLite.openDatabase("test-db.db");

  constructor() {
    makeAutoObservable(this);
  }

  initialiseDatabase() {
    this.db.transaction((tx) => {
      dbInitQueries.forEach((query) => {
        tx.executeSql(
          query,
          null,
          (txtObj, result) => console.log("Success init query"),
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
            console.log("Successfully retrieved data from database");
            resultCallback(resultSet.rows._array);
          }
        );
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
