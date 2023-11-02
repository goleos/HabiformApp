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
      })}
    >
      <Tab.Screen name="Triggers" component={TriggerNavigation} />
      <Tab.Screen name="Habits" component={HabitNavigation} />
      <Tab.Screen name="Dashboard" component={DashboardNavigation} options={{headerShown: false}} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}}/>
    </Tab.Navigator>
  );
}

export default AppTabs;
