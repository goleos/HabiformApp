// https://reactnavigation.org/docs/bottom-tab-navigator

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TriggersScreen from "./screens/TriggersScreen";
import HabitsScreen from "./screens/HabitsScreen";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator id="appTabNavigator" initialRouteName="Habits">
      <Tab.Screen name="Triggers" component={TriggersScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
    </Tab.Navigator>
  );
}

export default AppTabs;
