import { StyleSheet, Text, View } from "react-native";
import { hab } from "../models/habit";
import { Fab, Icon, IconButton, ScrollView, Stack } from "native-base";
import HabitListItem from "../components/HabitListItem";
import { habitsController } from "../controllers/habitsController";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddHabitScreen from "./AddHabitScreen";

const NavStack = createNativeStackNavigator();

export default function HabitsScreen({ navigation, isFocused }) {
  return (
    <>
      <Stack direction="column" padding={1}>
        {/* https://docs.nativebase.io/fab */}
        <Fab
          renderInPortal={false}
          marginBottom={0}
          placement="bottom-right"
          colorScheme="blue"
          size="lg"
          icon={<Icon name="add" as={Ionicons} />}
          onPress={() => {
            navigation.navigate("New Habit");
          }}
        />
        <ScrollView>
          {habitsController.habits.map((habit) => (
            <HabitListItem habit={habit} key={habit.habitID} />
          ))}
        </ScrollView>
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
