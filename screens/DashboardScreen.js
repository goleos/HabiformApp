import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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

function DashboardScreen() {
  const prolongedNotifications = notificationsController.prolongedNotifications;
  const prolongedHabit =
    prolongedNotifications.length > 0
      ? prolongedNotifications[0].content.data.habit
      : null;
  console.log("prolonged habit: " + prolongedHabit);
  const cancelRef = useRef(null);
  return (
    <SafeAreaView>
      {prolongedHabit !== null && (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={prolongedHabit}>
          <AlertDialog.Content>
            {/*<AlertDialog.CloseButton />*/}
            <AlertDialog.Header>
              Do you still need the app to remind you about
              {prolongedHabit.name}?
            </AlertDialog.Header>
            <AlertDialog.Body>
              <Center>
                <Heading>{prolongedHabit.name}</Heading>
              </Center>
              You have been receiving notifications for this habit for a while
              now. To avoid becoming dependent on app's reminders too much, are
              you ready to stop receiving notifications for this habit?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group>
                <Button
                  onPress={() => {
                    const habitObject = new Habit(prolongedHabit)
                    cancelHabitNotification(habitObject)
                    addNotificationToHabit(habitObject)
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
                        console.log("succc");
                      },
                      () => {
                        console.log("nooooo");
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
