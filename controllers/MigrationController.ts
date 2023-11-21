import { appSettingsController } from "./AppSettingsController";
import { dbController } from "./DatabaseController";
import {i18n} from "../utils/localisation";

export class MigrationController {
  migrateDataModelIfOld() {
    const version = appSettingsController.dataModelVersion;
    switch (version) {
      case 1:
        this.migrateDataModelFromVersion1to2();
        break;
      case 2:
        console.log("data model is up to date");
        break;
    }
  }

  migrateDataModelFromVersion1to2() {
    const alterTriggersTable = "ALTER TABLE triggers ADD triggerType TEXT";
    const updateTriggerRows1 =
      "UPDATE triggers SET triggerType = 'SimpleTrigger' where timeIntervalStart is null";
    const updateTriggerRows2 =
      "UPDATE triggers SET triggerType = 'TimeIntervalTrigger' where timeIntervalStart is not null";
    const updateTriggerRows = () => {
        dbController.db.transaction(
            (tx) => {
            tx.executeSql(updateTriggerRows1);
            tx.executeSql(updateTriggerRows2);
            },
            (error) => {
            alert("error migrating data model from version 1");
            console.log(error);
            },
            () => {
                appSettingsController
                    .setDataModelVersion(2)
                    .then((r) => console.log("updated data model version to 2"));
                console.log("successfully migrated data model from version 1");
                alert(i18n.t("migrationSuccessToVersion2Alert"));
            }
        );
    }
    dbController.db.transaction(
      (tx) => {
        tx.executeSql(alterTriggersTable);
      },
      (error) => {
        alert("error migrating data model from version 1");
        console.log(error);
      },
      () => {
        updateTriggerRows();
      }
    );
  }
}

export const migrationController = new MigrationController();
