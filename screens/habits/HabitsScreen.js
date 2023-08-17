import { StyleSheet } from "react-native";
import { Fab, Icon, ScrollView, Stack, Text } from "native-base";
import HabitListItem from "../../components/HabitListItem";
import { habitsController } from "../../controllers/HabitsController";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
          {habitsController.habits !== null ? (
            habitsController.habits.map((habit) => (
              <HabitListItem habit={habit} key={habit.habitID} />
            ))
          ) : (
            <Text>Loading...</Text>
          )}
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