import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import tabBar from "./tabBar";
import { appSettingsController } from "../controllers/AppSettingsController";
import {i18n} from "../utils/localisation";

const NativeNavigationStack = createNativeStackNavigator();

export const WelcomeStack = () => {
  return (
    <NativeNavigationStack.Navigator
      initialRouteName={
        appSettingsController.showIntroScreen ? "Welcome" : "App"
      } screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <NativeNavigationStack.Screen
        name={"Welcome"}
        component={WelcomeScreen}
        options={{headerShown: true, title: i18n.t("welcomeScreenTitle")}}
      />
      <NativeNavigationStack.Screen name={"App"} component={tabBar} />
    </NativeNavigationStack.Navigator>
  );
};
