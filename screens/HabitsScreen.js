import { StyleSheet, Text, View } from "react-native";
import { hab } from "../models/habit";
import {ScrollView, Stack} from "native-base";
import HabitListItem from "../components/HabitListItem";
import { habitsController } from "../controllers/habitsController";

export default function HabitsScreen() {
  return (
    <Stack direction="column" padding={1}>
      <ScrollView>
        {habitsController.habits.map((habit) => (
            <HabitListItem habit={habit} key={habit.habitID} />
        ))}
      </ScrollView>
    </Stack>
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
