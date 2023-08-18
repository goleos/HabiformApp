// https://reactnavigation.org/docs/native-stack-navigator

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HabitsScreen from "../screens/habits/HabitsScreen";
import ManageHabitScreen from "../screens/habits/ManageHabitScreen";
import TriggersScreen from "../screens/triggers/TriggersScreen";
import ManageTriggerScreen from "../screens/triggers/ManageTriggerScreen";
import TriggerPage from "../screens/triggers/TriggerPage";
import HabitPage from "../screens/habits/HabitPage";

const NativeNavigationStack = createNativeStackNavigator();

export const HabitNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="HabitList">
      <NativeNavigationStack.Screen name="My Habits" component={HabitsScreen} />
      <NativeNavigationStack.Screen
        name="ManageHabit"
        component={ManageHabitScreen}
      />
      <NativeNavigationStack.Screen name={"HabitPage"} component={HabitPage} />
    </NativeNavigationStack.Navigator>
  );
};

export const TriggerNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="My Triggers">
      <NativeNavigationStack.Screen
        name="My Triggers"
        component={TriggersScreen}
      />
      <NativeNavigationStack.Screen
        name="ManageTrigger"
        component={ManageTriggerScreen}
        options={({ route }) => ({
          title: "Add or edit trigger",
        })}
      />
      <NativeNavigationStack.Screen name="Trigger" component={TriggerPage} />
    </NativeNavigationStack.Navigator>
  );
};
