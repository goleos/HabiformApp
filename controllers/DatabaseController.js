// example from https://mobx.js.org/react-integration.html
// mobx tutorial: https://mobx.js.org/react-integration.html

import { makeAutoObservable, observable, action } from "mobx";
import * as SQLLite from "expo-sqlite";

export class DatabaseController {
  db = SQLLite.openDatabase("test-db.db");
  names = ["no", "yes"];

  constructor() {
    makeAutoObservable(this);
  }

  initialiseDatabase() {
    this.db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists names (id Integer Primary Key Autoincrement, name TEXT)",
        null,
        (txtObj, result) => console.log("Initialised database"),
        (txtObj, error) =>
          console.log("Error initialising the database: " + error)
      );
      this.db.transaction((tx) => {
        tx.executeSql("insert into names (name) values ('hello')");
      });
    });
  }

  getNames() {
    if (this.names != null) {
      this.names = ["1", "2"];
      // this.db.transaction(
      //     (tx) => {
      //       tx.executeSql("select * from names", null, (txtObj, resultSet) => {
      //         this.names = resultSet.rows._array;
      //         console.log(this.names);
      //       });
      //     },
      //     (txtObj, error) => console.log(txtObj)
      // );
    }
  }
}

export const dbController = new DatabaseController();
