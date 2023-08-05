import AppTabs from "./navigation/tabBar";
import { NavigationContainer } from "@react-navigation/native";
import {NativeBaseProvider} from "native-base";

export default function App() {
  return (
      <NativeBaseProvider>
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
      </NativeBaseProvider>
  );
}
