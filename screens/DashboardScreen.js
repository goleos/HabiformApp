import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import { observer } from "mobx-react";
import { dbController } from "../controllers/DatabaseController";
import {Button, Flex, Heading, VStack} from "native-base";
import { habitsController } from "../controllers/HabitsController";
import { triggersController } from "../controllers/TriggersController";
import TriggerListItem from "../components/TriggerListItem";
import UpNextBox from "../components/UpNextBox";
import HabitList from "../components/HabitList";

function DashboardScreen() {
  return (
      <SafeAreaView>

      <Flex height={"100%"} bg={"white"} padding={2}>
          <VStack space={3} paddingX={3}>
              <Heading>Up next</Heading>
              <UpNextBox trigger={triggersController.getSoonestTriggers()[0]} habits={habitsController.habits.filter((habit) => habit.triggerEventID === triggersController.getSoonestTriggers()[0].triggerEventID)} />
          </VStack>
          <VStack>
              <Heading>My active habits</Heading>
              <HabitList habits={habitsController.getActiveHabits()} />
          </VStack>
      </Flex>
      </SafeAreaView>
  );
}

export default observer(DashboardScreen);
