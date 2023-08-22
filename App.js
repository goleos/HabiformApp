import AppTabs from "./navigation/tabBar";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { uiTheme } from "./utils/uiTheme";
import { habitsController } from "./controllers/HabitsController";
import { triggersController } from "./controllers/TriggersController";
import { useEffect } from "react";
import { observer } from "mobx-react";

function App() {
  useEffect(() => {
    habitsController.requestHabits();
    triggersController.requestTriggers();
  }, []);

  return (
    <NativeBaseProvider theme={uiTheme}>
      <NavigationContainer>
        {habitsController.habits !== null && <AppTabs />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default observer(App);
