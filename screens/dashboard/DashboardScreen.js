import { SafeAreaView } from "react-native";
import { observer } from "mobx-react";
import {
  Alert,
  AlertDialog,
  Button,
  Heading,
  Icon, ScrollView,
  Text,
  VStack,
} from "native-base";
import {
  addNotificationToHabit,
  cancelHabitNotification,
  habitsController,
} from "../../controllers/HabitsController";
import UpNextBox from "../../components/UpNextBox";
import { notificationsController } from "../../controllers/NotificationsController";
import { useRef, useState } from "react";
import Habit from "../../models/habit";
import HabitListItem from "../../components/listItems/HabitListItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { triggerScheduleController } from "../../controllers/TriggerScheduleController";
import {i18n} from "../../utils/localisation";

function DashboardScreen({ navigation }) {
  const prolongedNotifications = notificationsController.prolongedNotifications;
  const prolongedHabit =
    prolongedNotifications.length > 0
      ? prolongedNotifications[0].content.data.habit
      : null;
  const cancelRef = useRef(null);
  const [dismissedProlong, setDismissedProlong] = useState(false);
  return (
    <SafeAreaView>
      {prolongedHabit !== null && dismissedProlong === false && (
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={prolongedHabit}>
          <AlertDialog.Content width={"90%"}>
            {/*<AlertDialog.CloseButton />*/}
            <AlertDialog.Header>
              <Text bold>
                {i18n.t("doYouNeedReminders")} "{prolongedHabit.name}"?
              </Text>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <VStack padding={1} space={5}>
                <HabitListItem habit={prolongedHabit} hideArrowButton={true} />
                <Text fontSize={"md"}>
                  {i18n.t("doYouNeedRemindersMessage")}
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
                  {i18n.t("keepRemindersOption")}
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
                    setDismissedProlong(true);
                  }}
                  size={"md"}
                >
                  {i18n.t("stopRemindersOption")}
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      )}

      <VStack
        height={"100%"}
        bg={"white"}
        justifyContent={"space-between"}
        // padding={2}
        space={8}
      >
        <ScrollView>
        <VStack space={3} paddingX={3}>
          {triggerScheduleController.schedule.length > 0 ? (
            <UpNextBox
              trigger={triggerScheduleController.schedule[0]}
              habits={habitsController.habits.filter(
                (habit) =>
                  habit.triggerEventID ===
                  triggerScheduleController.schedule[0].triggerEventID
              )}
            />
          ) : (
            <VStack space={2}>
              <Heading textAlign={"center"} alignSelf={"center"} mt={10}>
                {i18n.t("noUpcomingHabitsMessage")}
              </Heading>
              {/*<Button onPress={() => navigation.navigate("My Habits")}>View all habits</Button>*/}
            </VStack>
          )}
        </VStack>
        </ScrollView>
        <VStack space={2} padding={2}>
          <Heading>{i18n.t("habitsWithoutTimedTriggers")}</Heading>
          <Alert colorScheme={"info"} borderRadius={10}>
            {i18n.t("noTimedTriggerInfoBox")}
          </Alert>
          <Button
            onPress={() => {
              navigation.navigate("NoTimeEstimateHabitList");
            }}
            rightIcon={
              <Icon as={MaterialCommunityIcons} name={"chevron-right"} />
            }
          >
            {i18n.t("viewHabitsWithoutTimedTriggers")}
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
}

export default observer(DashboardScreen);
