// https://reactnavigation.org/docs/native-stack-navigator

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HabitsScreen from "../screens/habits/HabitsScreen";
import ManageHabitScreen from "../screens/habits/ManageHabitScreen";
import TriggersScreen from "../screens/triggers/TriggersScreen";
import ManageTriggerScreen from "../screens/triggers/ManageTriggerScreen";
import TriggerPage from "../screens/triggers/TriggerPage";
import HabitPage from "../screens/habits/HabitPage";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import HabitListWithoutEstimate from "../screens/dashboard/HabitListWithoutEstimate";
import { focusedTriggerController } from "../controllers/FocusedTriggerController";

const NativeNavigationStack = createNativeStackNavigator();

export const HabitNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="HabitList">
      <NativeNavigationStack.Screen name="My Habits" component={HabitsScreen} />
      <NativeNavigationStack.Screen
        name="ManageHabit"
        component={ManageHabitScreen}
        options={{title: 'Add or edit habit'}}
      />
      <NativeNavigationStack.Screen name={"HabitPage"} component={HabitPage} options={({route}) => ({
          title: route.params.habit.name
      })} />
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
        options={() => ({
          title: "Add or edit trigger",
        })}
      />
      <NativeNavigationStack.Screen name="Trigger" component={TriggerPage} options={({route}) => ({
          title: focusedTriggerController.trigger.name
      })} />
    </NativeNavigationStack.Navigator>
  );
};

export const DashboardNavigation = () => {
    return (
        <NativeNavigationStack.Navigator initialRouteName="DashboardScreen" screenOptions={{headerShown: true}}>
            <NativeNavigationStack.Screen
                name="DashboardScreen"
                component={DashboardScreen}
                options={{title: "Dashboard"}}
            />
            <NativeNavigationStack.Screen
                name="NoTimeEstimateHabitList"
                component={HabitListWithoutEstimate}
                options={{title: "Habits with no time"}}
            />
        </NativeNavigationStack.Navigator>
    );
};
