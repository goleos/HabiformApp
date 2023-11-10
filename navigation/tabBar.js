// https://reactnavigation.org/docs/bottom-tab-navigator
// https://www.npmjs.com/package/react-native-ionicons
// https://reactnavigation.org/docs/tab-based-navigation
// https://www.npmjs.com/package/react-native-vector-icons

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  DashboardNavigation,
  HabitNavigation,
  TriggerNavigation,
} from "./NativeStacks";
import { uiTheme } from "../utils/uiTheme";
import { materialIconsNames } from "../utils/constants";
import {i18n} from "../utils/localisation";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      id="appTabNavigator"
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        //  based on the code example in https://reactnavigation.org/docs/tab-based-navigation
        //  [Accessed July 2023]
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Habits") {
            iconName = "repeat";
          } else if (route.name === "Triggers") {
            iconName = focused ? materialIconsNames.trigger : materialIconsNames.trigger + '-outline';
          } else if (route.name === "Dashboard") {
            iconName = focused ? "view-grid" : "view-grid-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "cog" : "cog-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: uiTheme.colors.tabBarColour.focused,
        tabBarInactiveTintColor: uiTheme.colors.tabBarColour.unFocused,
        headerShown: false,
          // tabBarActiveBackgroundColor: "#cfd3f6",
          // tabBarInactiveBackgroundColor: "#cfd3f6"
      })}
    >
      <Tab.Screen name="Triggers" component={TriggerNavigation} options={{title: i18n.t("triggersTab")}} />
      <Tab.Screen name="Habits" component={HabitNavigation} options={{title: i18n.t("habitsTab")}} />
      <Tab.Screen name="Dashboard" component={DashboardNavigation} options={{headerShown: false, title: i18n.t("dashboardTab")}} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown: true, title: i18n.t("settingsTab")}}/>
    </Tab.Navigator>
  );
}

export default AppTabs;
