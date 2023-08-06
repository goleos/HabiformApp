import AppTabs from "./navigation/tabBar";
import { NavigationContainer } from "@react-navigation/native";
import {NativeBaseProvider} from "native-base";
import {uiTheme} from "./uiTheme";

export default function App() {
  return (
      <NativeBaseProvider theme={uiTheme}>
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
      </NativeBaseProvider>
  );
}
