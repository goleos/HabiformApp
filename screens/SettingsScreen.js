import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { habitsController } from "../controllers/habitsController";
import Habit from "../models/habit";

export default function SettingsScreen() {
  const insertSampleData = () => {
    const habits = [
      { name: "Go to Gym", isFormed: false },
      { name: "Swim in the ocean", isFormed: true },
      { name: "Meditate", isFormed: false },
    ];
    habits.forEach((habitJS) => {
      const habit = Habit(habitJS);
      habitsController.createNewHabit(habit);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button onPress={insertSampleData}>Sample data</Button>
    </View>
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
