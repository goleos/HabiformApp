import { SafeAreaView, StyleSheet, View } from "react-native";
import { observer } from "mobx-react";
import { dbController } from "../controllers/DatabaseController";
import {
  Alert,
  AlertDialog,
  Button,
  Center,
  Flex,
  Heading,
  ScrollView,
  VStack,
  Text,
} from "native-base";
import {
  addNotificationToHabit,
  cancelHabitNotification,
  habitsController,
  setNotifications,
} from "../controllers/HabitsController";
import { triggersController } from "../controllers/TriggersController";
import TriggerListItem from "../components/listItems/TriggerListItem";
import UpNextBox from "../components/UpNextBox";
import HabitList from "../components/HabitList";
import InfoAlert from "../components/InfoAlert";
import { notificationsController } from "../controllers/NotificationsController";
import { useRef } from "react";
import Habit from "../models/habit";
import HabitListItem from "../components/listItems/HabitListItem";

function DashboardScreen() {
  const prolongedNotifications = notificationsController.prolongedNotifications;
  const prolongedHabit =
    prolongedNotifications.length > 0
      ? prolongedNotifications[0].content.data.habit
      : null;
  // console.log("prolonged habit: " + prolongedHabit);
  const cancelRef = useRef(null);
  return (
    <SafeAreaView>
      {prolongedHabit !== null && (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={prolongedHabit}>
          <AlertDialog.Content width={"90%"}>
            {/*<AlertDialog.CloseButton />*/}
            <AlertDialog.Header>
              <Text bold>
                Do you still need the app to remind you about "
                {prolongedHabit.name}"?
              </Text>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <VStack padding={1} space={5}>

              <HabitListItem habit={prolongedHabit} hideArrowButton={true} />
              <Text fontSize={'md'}>
                If you remember to complete this specific habit every time, you
                should stop the app reminding you about it. Otherwise, you might
                become too dependent on this app.
              </Text>
              </VStack>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group>
                <Button
                  onPress={() => {
                    const habitObject = new Habit(prolongedHabit);
                    cancelHabitNotification(habitObject);
                    addNotificationToHabit(habitObject);
                    notificationsController.requestAllScheduledNotifications();
                  }}
                  variant={"outline"}
                  size={"md"}
                >
                  Keep reminders
                </Button>
                <Button
                  onPress={() => {
                    prolongedHabit.shouldNotify = false;
                    habitsController.createNewHabit(
                      prolongedHabit,
                      () => {
                        // console.log("succc");
                      },
                      () => {
                        // console.log("nooooo");
                      }
                    );
                    notificationsController.requestAllScheduledNotifications();
                  }}
                  size={"md"}
                >
                  Stop reminders
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      )}
      <Flex height={"100%"} bg={"white"} padding={2}>
        <VStack space={3} paddingX={3}>
          {triggersController.triggers != false && (
            <UpNextBox
              trigger={triggersController.getSoonestTriggers()[0]}
              habits={habitsController.habits.filter(
                (habit) =>
                  habit.triggerEventID ===
                  triggersController.getSoonestTriggers()[0].triggerEventID
              )}
            />
          )}
        </VStack>
        <VStack mt={3}>
          <Heading>Habits without time estimate</Heading>
          {/*<InfoAlert heading={'Tip'} text={'Watch out for habits in this list since the app cannot remind you about them'} />*/}
          <Alert colorScheme={"info"} borderRadius={10}>
            Watch out for habits in this list since the app cannot remind you
            about them
          </Alert>
          <ScrollView>
            <HabitList
              hideArrowButton={true}
              habits={habitsController.getUntimedActiveHabits()}
            />
          </ScrollView>
        </VStack>
      </Flex>
    </SafeAreaView>
  );
}

export default observer(DashboardScreen);
