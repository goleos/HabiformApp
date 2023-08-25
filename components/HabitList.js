import {habitsController} from "../controllers/HabitsController";
import {Pressable, ScrollView, Text, Stack} from "native-base";
import HabitListItem from "./listItems/HabitListItem";

function HabitList({habits, onItemPress}) {
    return (
        <Stack direction="column" padding={1}>
            {habits !== null ? (
                habits.map((habit) => onItemPress !== undefined ? (
                    <Pressable
                        key={habit.habitID}
                        onPress={() => onItemPress(habit)}
                    >
                        <HabitListItem habit={habit} />
                    </Pressable>
                ) : (
                    <HabitListItem key={habit.habitID} habit={habit} />
                ))
            ) : (
                <Text>Loading...</Text>
            )}
        </Stack>
    )
}

export default HabitList