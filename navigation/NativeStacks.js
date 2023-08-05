// https://reactnavigation.org/docs/native-stack-navigator

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HabitsScreen from "../screens/HabitsScreen";
import AddHabitScreen from "../screens/AddHabitScreen";

const NativeNavigationStack = createNativeStackNavigator();

export const HabitNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="HabitList">
      <NativeNavigationStack.Screen name="HabitList" component={HabitsScreen} />
      <NativeNavigationStack.Screen name="AddNewHabit" component={AddHabitScreen} />
    </NativeNavigationStack.Navigator>
  );
};
