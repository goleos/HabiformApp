// https://reactnavigation.org/docs/native-stack-navigator

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HabitsScreen from "../screens/habits/HabitsScreen";
import AddHabitScreen from "../screens/habits/AddHabitScreen";
import TriggersScreen from "../screens/triggers/TriggersScreen";
import AddTriggerScreen from "../screens/triggers/AddTriggerScreen";
import TriggerPage from "../screens/triggers/TriggerPage";

const NativeNavigationStack = createNativeStackNavigator();

export const HabitNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="HabitList">
      <NativeNavigationStack.Screen name="My Habits" component={HabitsScreen} />
      <NativeNavigationStack.Screen name="New Habit" component={AddHabitScreen} />
    </NativeNavigationStack.Navigator>
  );
};

export const TriggerNavigation = () => {
    return (
        <NativeNavigationStack.Navigator initialRouteName="HabitList">
            <NativeNavigationStack.Screen name="My Triggers" component={TriggersScreen} />
            <NativeNavigationStack.Screen name="Add trigger" component={AddTriggerScreen} />
            <NativeNavigationStack.Screen name="Trigger" component={TriggerPage} />
        </NativeNavigationStack.Navigator>
    );
};