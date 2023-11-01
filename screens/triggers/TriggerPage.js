import {
  Text,
  Container,
  Flex,
  VStack,
  Heading,
  HStack,
  Icon,
  Box,
  Button,
  ScrollView,
} from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import HabitListItem from "../../components/listItems/HabitListItem";
import { hab } from "../../models/habit";
import { habitsController } from "../../controllers/HabitsController";
import { observer } from "mobx-react";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import { focusedTriggerController } from "../../controllers/FocusedTriggerController";

function TriggerPage({ navigation, route }) {
  const trigger = focusedTriggerController.trigger;
  const linkedHabits = focusedTriggerController.getLinkedHabits();

  navigation.addListener("beforeRemove", () => {
    focusedTriggerController.dismissTrigger();
  });

  return (
    <Flex height={"100%"} bg={"white"} justifyContent={"space-between"}>
      <ScrollView>
        <VStack margin={2} space={2}>
          <HeadingWithIcon
            iconName={"clock-out"}
            headingText={trigger.name}
            bodyText={trigger.extraNotes}
          />

          <Box borderRadius={10} bg={"blue.200"} padding={2}>
            <VStack alignItems={"center"}>
              <HStack alignItems={"center"} space={1}>
                <Icon as={Ionicons} size={25} name="time" color="blue.700" />
                <Heading fontSize={18}>Estimated Time Interval</Heading>
              </HStack>
              {trigger.timeIntervalStart != null ? (
                <Text>
                  {trigger.timeIntervalStart} — {trigger.timeIntervalEnd}
                </Text>
              ) : (
                <Text color={"gray.600"} italic>
                  Not provided
                </Text>
              )}
            </VStack>
          </Box>

          <Heading>Linked habits</Heading>
          {linkedHabits.length !== 0 ? (
            linkedHabits.map((habit) => {
              return (
                <HabitListItem
                  hideArrowButton={true}
                  habit={habit}
                  key={habit.habitID}
                />
              );
            })
          ) : (
            <Text>There are no linked habits</Text>
          )}
        </VStack>
        <Button
          marginX={2}
          marginY={3}
          onPress={() => {
            navigation.navigate("ManageTrigger", {
              trigger: trigger,
            });
          }}
        >
          Edit
        </Button>
      </ScrollView>
    </Flex>
  );
}

export default observer(TriggerPage);
