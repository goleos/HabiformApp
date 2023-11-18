import { Pressable, Stack, Text } from "native-base";
import HabitListItem from "./listItems/HabitListItem";

function HabitList({ habits, onItemPress, hideArrowButton }) {
  return (
    <Stack direction="column" padding={1}>
      {habits !== null ? (
        habits.map((habit) =>
          onItemPress !== undefined ? (
              <HabitListItem key={habit.habitID} onPress={() => onItemPress(habit)} habit={habit} />
          ) : (
            <HabitListItem
              hideArrowButton={hideArrowButton}
              key={habit.habitID}
              habit={habit}
            />
          )
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </Stack>
  );
}

export default HabitList;
