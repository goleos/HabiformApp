import { NavigationContainer } from "@react-navigation/native";
import {NativeBaseProvider, Text} from "native-base";
import { uiTheme } from "./utils/uiTheme";
import { habitsController } from "./controllers/HabitsController";
import { triggersController } from "./controllers/TriggersController";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { WelcomeStack } from "./navigation/WelcomeNavigation";

import {LogBox, StatusBar} from "react-native";
import { appSettingsController } from "./controllers/AppSettingsController";
import { triggerScheduleController } from "./controllers/TriggerScheduleController";
import {migrationController} from "./controllers/MigrationController";
import {currentDataModelVersion} from "./utils/constants";

LogBox.ignoreLogs(["In React 18, SSRProvider", "Constants.platform.ios.model"]);

function App() {
  const [effectDone, setEffectDone] = useState(false);

  useEffect(() => {
    console.info("App.js: triggered useEffect");
    const loadSettingsData = async () => {
      // console.log("Loading data for app settings");
      await appSettingsController.loadFromAsyncStorage();
      // console.log("Shouldshowscreen: " + appSettingsController.showIntroScreen);
    };
    loadSettingsData()
      .then((value) => {
        if (appSettingsController.dataModelVersion < currentDataModelVersion) {
          console.log("App.js: data model version is null or less than current, migrating data model");
          migrationController.migrateDataModelIfOld();
        }
        setEffectDone(true);
      })
      .catch(console.error);
    habitsController.requestHabits();
    triggersController.requestTriggers();
    // So that the status bar does not disappear in dark mode
    StatusBar.setBarStyle('dark-content');
  }, []);

  useEffect(() => {
    triggerScheduleController.formSchedule()
  }, [triggersController.triggers, habitsController.habits])

  // https://stackoverflow.com/a/65049865
  // every minute we refresh the habit schedule
  const MINUTE_MS = 60000;
  useEffect(() => {
    const interval = setInterval(() => {
      triggerScheduleController.formSchedule();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const isReady =
    habitsController.habits !== undefined &&
    triggersController.triggers !== undefined;

  return (
    <NativeBaseProvider theme={uiTheme}>
      <NavigationContainer>
        {isReady && effectDone ? <WelcomeStack /> : <Text>Loading</Text>}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default observer(App);
