import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import { observer } from "mobx-react";
import { dbController } from "../controllers/DatabaseController";
import {Alert, Button, Flex, Heading, ScrollView, VStack} from "native-base";
import { habitsController } from "../controllers/HabitsController";
import { triggersController } from "../controllers/TriggersController";
import TriggerListItem from "../components/listItems/TriggerListItem";
import UpNextBox from "../components/UpNextBox";
import HabitList from "../components/HabitList";
import InfoAlert from "../components/InfoAlert";

function DashboardScreen() {
  return (
      <SafeAreaView>
      <Flex height={"100%"} bg={"white"} padding={2}>
          <VStack space={3} paddingX={3}>
              {triggersController.triggers != false && <UpNextBox trigger={triggersController.getSoonestTriggers()[0]} habits={habitsController.habits.filter((habit) => habit.triggerEventID === triggersController.getSoonestTriggers()[0].triggerEventID)} />}
          </VStack>
          <VStack mt={3}>
              <Heading>Habits without time estimate</Heading>
              {/*<InfoAlert heading={'Tip'} text={'Watch out for habits in this list since the app cannot remind you about them'} />*/}
              <Alert colorScheme={'info'} borderRadius={10}>
                  Watch out for habits in this list since the app cannot remind you about them
              </Alert>
              <ScrollView>

              <HabitList hideArrowButton={true} habits={habitsController.getUntimedActiveHabits()} />
              </ScrollView>
          </VStack>
      </Flex>
      </SafeAreaView>
  );
}

export default observer(DashboardScreen);
