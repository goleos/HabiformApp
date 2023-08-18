import { Button, Text } from "native-base";

function HabitPage({ navigation, route }) {
  const habit = route.params.habit;
  return (
    <>
      <Text>{habit.name}</Text>
      <Button
        onPress={() => {
          navigation.navigate("ManageHabit", {
            habit: habit,
          });
        }}
      >
        Edit
      </Button>
    </>
  );
}

export default HabitPage;
