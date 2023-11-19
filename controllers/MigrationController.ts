import {appSettingsController} from "./AppSettingsController";
import {dbController} from "./DatabaseController";

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
        dbController.db.transaction((tx) => {
            tx.executeSql("ALTER TABLE triggers ADD triggerType TEXT");
        }, (error) => {
            alert("error migrating data model from version 1");
            console.log(error);
        }, () => {
            appSettingsController.setDataModelVersion(2).then(r => console.log("updated data model version to 2"));
            console.log("successfully migrated data model from version 1");
        });
    }
}

export const migrationController = new MigrationController();