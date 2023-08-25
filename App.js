import { NavigationContainer } from "@react-navigation/native";
import {NativeBaseProvider, Text} from "native-base";
import { uiTheme } from "./utils/uiTheme";
import { habitsController } from "./controllers/HabitsController";
import { triggersController } from "./controllers/TriggersController";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { WelcomeStack } from "./navigation/WelcomeNavigation";

import { LogBox } from "react-native";
import { appSettingsController } from "./controllers/AppSettingsController";

LogBox.ignoreLogs(["In React 18, SSRProvider", "Constants.platform.ios.model"]);

function App() {
  useEffect(() => {
    console.log("App.js: triggered useEffect");
    const loadSettingsData = async () => {
      return await appSettingsController.loadFromAsyncStorage();
    };
    loadSettingsData().catch(console.error);
    habitsController.requestHabits();
    triggersController.requestTriggers();
  }, []);

  const isReady = habitsController.habits !== undefined && triggersController.triggers !== undefined

  return (
    <NativeBaseProvider theme={uiTheme}>
      <NavigationContainer>
        {isReady ? <WelcomeStack /> : <Text>Loading</Text>}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default observer(App);
