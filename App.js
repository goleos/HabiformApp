import AppTabs from "./navigation/tabBar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { uiTheme } from "./utils/uiTheme";
import { habitsController } from "./controllers/HabitsController";
import { triggersController } from "./controllers/TriggersController";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { WelcomeStack } from "./navigation/WelcomeNavigation";

import { LogBox } from "react-native";

LogBox.ignoreLogs(['In React 18, SSRProvider', 'Constants.platform.ios.model'])

function App() {
  useEffect(() => {
    habitsController.requestHabits();
    triggersController.requestTriggers();
  }, []);

  return (
    <NativeBaseProvider theme={uiTheme}>
      <NavigationContainer>
        {habitsController.habits !== null && <WelcomeStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default observer(App);
