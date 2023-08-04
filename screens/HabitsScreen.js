import { StyleSheet, Text, View } from "react-native";
import {hab} from "../models/habit";
import {Stack} from "native-base";
import HabitListItem from "../components/HabitListItem";

export default function HabitsScreen() {
  return (
      <Stack direction="column" padding={1}>
        <HabitListItem habit={hab} />
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
