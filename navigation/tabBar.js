// https://reactnavigation.org/docs/bottom-tab-navigator
// https://www.npmjs.com/package/react-native-ionicons
// https://reactnavigation.org/docs/tab-based-navigation
// https://www.npmjs.com/package/react-native-vector-icons

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TriggersScreen from "../screens/triggers/TriggersScreen";
import HabitsScreen from "../screens/habits/HabitsScreen";
import DashboardScreen from "../screens/DashboardScreen";
import SettingsScreen from "../screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { HabitNavigation } from "./NativeStacks";
import { TriggerNavigation } from "./NativeStacks";
import { uiTheme } from "../utils/uiTheme";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      id="appTabNavigator"
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        //  based on the example in https://reactnavigation.org/docs/tab-based-navigation
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Habits") {
            iconName = "repeat";
          } else if (route.name === "Triggers") {
            iconName = "clock-out";
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: true}} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}}/>
    </Tab.Navigator>
  );
}

export default AppTabs;
