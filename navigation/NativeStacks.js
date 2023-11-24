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
import { i18n } from "../utils/localisation";
import ChooseNewTriggerTypeScreen from "../screens/triggers/ChooseNewTriggerTypeScreen";
import { Actionsheet, Box, Button, Icon, IconButton, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const NativeNavigationStack = createNativeStackNavigator();

export const HabitNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="HabitList">
      <NativeNavigationStack.Screen
        name="My Habits"
        component={HabitsScreen}
        options={{ title: i18n.t("habitsTab") }}
      />
      <NativeNavigationStack.Screen
        name="ManageHabit"
        component={ManageHabitScreen}
        options={{ title: i18n.t("addOrEditHabit") }}
      />
      <NativeNavigationStack.Screen
        name={"HabitPage"}
        component={HabitPage}
        options={({ route }) => ({
          title: route.params.habit.name,
        })}
      />
    </NativeNavigationStack.Navigator>
  );
};

export const TriggerNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="My Triggers">
      <NativeNavigationStack.Screen
        name="My Triggers"
        component={TriggersScreen}
        options={{
          title: i18n.t("triggersTab"),
        }}
      />
      <NativeNavigationStack.Screen
        name="ManageTrigger"
        component={ManageTriggerScreen}
        options={() => ({
          title: i18n.t("addOrEditTrigger"),
        })}
      />
      <NativeNavigationStack.Screen
        name="Trigger"
        component={TriggerPage}
        options={({ route }) => ({
          title: focusedTriggerController.trigger.name,
        })}
      />
      <NativeNavigationStack.Screen
        name="ManageTriggerNavigator"
        component={ManageTriggerNavigation}
        options={({ route }) => ({
          title: i18n.t("createANewTrigger"),
          presentation: "modal",
          headerShown: false,
        })}
      />
    </NativeNavigationStack.Navigator>
  );
};

export const ManageTriggerNavigation = () => {
  return (
    <NativeNavigationStack.Navigator initialRouteName="ChooseNewTriggerType">
      <NativeNavigationStack.Screen
        name="ChooseNewTriggerType"
        component={ChooseNewTriggerTypeScreen}
        options={({ route }) => ({
          title: i18n.t("createANewTrigger"),
        })}
      />
      <NativeNavigationStack.Screen
        name="ManageTrigger"
        component={ManageTriggerScreen}
        options={() => ({
          title: i18n.t("addOrEditTrigger"),
        })}
      />
    </NativeNavigationStack.Navigator>
  );
};

export const DashboardNavigation = () => {
  return (
    <NativeNavigationStack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{ headerShown: true }}
    >
      <NativeNavigationStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ title: i18n.t("dashboardTab") }}
      />
      <NativeNavigationStack.Screen
        name="NoTimeEstimateHabitList"
        component={HabitListWithoutEstimate}
        options={{ title: "Habits with no time" }}
      />
    </NativeNavigationStack.Navigator>
  );
};
