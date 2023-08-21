import { StyleSheet } from "react-native";
import {
  Fab,
  Flex,
  Icon,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import HabitListItem from "../../components/HabitListItem";
import { habitsController } from "../../controllers/HabitsController";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import HabitList from "../../components/HabitList";

function HabitsScreen({ navigation, isFocused }) {
  // console.log(habitsController.habits);
  return (
    <>
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        colorScheme="blue"
        size="lg"
        icon={<Icon name="add" as={Ionicons} />}
        onPress={() => {
          navigation.navigate("ManageHabit", {
            habit: null,
          });
        }}
      />
      <Flex height={"100%"} bg={"white"}>

          {/* https://docs.nativebase.io/fab */}
          <HabitList habits={habitsController.habits} onItemPress={(habit) => {
              navigation.navigate("HabitPage", {
                  habit: habit,
              });
          }}/>

      </Flex>
    </>
  );
}

export default observer(HabitsScreen);
