// https://reactnavigation.org/docs/bottom-tab-navigator
// https://www.npmjs.com/package/react-native-ionicons
// https://reactnavigation.org/docs/tab-based-navigation
// https://www.npmjs.com/package/react-native-vector-icons

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TriggersScreen from "./screens/TriggersScreen";
import HabitsScreen from "./screens/HabitsScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      id="appTabNavigator"
      initialRouteName="Habits"
      screenOptions={({ route }) => ({
        //  based on the example in https://reactnavigation.org/docs/tab-based-navigation
        tabBarIcon: () => {
          if (route.name === "Habits") {
            return <Entypo name={"cycle"} size={20} color="red" />;
          } else if (route.name === "Triggers") {
            return <Ionicons name={"alarm-outline"} size={20} />;
          } else if (route.name === "Dashboard") {
            return <Ionicons name={"grid-outline"} size={20} />;
          } else if (route.name === "Settings") {
            return <Ionicons name={"settings-outline"} size={20} />;
          }
        },
      })}
    >
      <Tab.Screen name="Triggers" component={TriggersScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default AppTabs;
