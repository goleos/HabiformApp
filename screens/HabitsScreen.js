import { StyleSheet, Text, View } from "react-native";
import { hab } from "../models/habit";
import { Icon, IconButton, ScrollView, Stack } from "native-base";
import HabitListItem from "../components/HabitListItem";
import { habitsController } from "../controllers/habitsController";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddHabitScreen from "./AddHabitScreen";

const NavStack = createNativeStackNavigator();

export default function HabitsScreen({ navigation }) {
  return (
      <>
          <NavStack.Navigator>
              <NavStack.Screen name="NewHabit" component={AddHabitScreen} />
          </NavStack.Navigator>
          <Stack direction="column" padding={1}>
              <ScrollView>
                  {habitsController.habits.map((habit) => (
                      <HabitListItem habit={habit} key={habit.habitID} />
                  ))}
                  <IconButton
                      icon={
                          <Icon
                              as={Ionicons}
                              name="add"
                              onPress={() => {
                                  navigation.navigate("AddNewHabit");
                              }}
                          />
                      }
                  />
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
