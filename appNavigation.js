// https://reactnavigation.org/docs/bottom-tab-navigator

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TriggersScreen from "./screens/TriggersScreen";
import HabitsScreen from "./screens/HabitsScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator id="appTabNavigator" initialRouteName="Habits">
      <Tab.Screen name="Triggers" component={TriggersScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default AppTabs;
