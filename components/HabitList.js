import {habitsController} from "../controllers/HabitsController";
import {Pressable, ScrollView, Text, Stack} from "native-base";
import HabitListItem from "./listItems/HabitListItem";

function HabitList({habits, onItemPress}) {
    return (
        <Stack direction="column" padding={1}>
        <ScrollView>
            {habits !== null ? (
                habits.map((habit) => (
                    <Pressable
                        key={habit.habitID}
                        onPress={() => onItemPress(habit)}
                    >
                        <HabitListItem habit={habit} />
                    </Pressable>
                ))
            ) : (
                <Text>Loading...</Text>
            )}
        </ScrollView>
        </Stack>
    )
}

export default HabitList