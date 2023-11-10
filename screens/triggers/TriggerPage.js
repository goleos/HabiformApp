import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import HabitListItem from "../../components/listItems/HabitListItem";
import { observer } from "mobx-react";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import { focusedTriggerController } from "../../controllers/FocusedTriggerController";
import {i18n} from "../../utils/localisation";

function TriggerPage({ navigation }) {
  const trigger = focusedTriggerController.trigger;
  const linkedHabits = focusedTriggerController.getLinkedHabits();

  return (
    <Flex height={"100%"} bg={"white"} justifyContent={"space-between"} >
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
                <Heading fontSize={18}>{i18n.t("estimatedTimeInterval")}</Heading>
              </HStack>
              {trigger.timeIntervalStart != null ? (
                <Text>
                  {trigger.timeIntervalStart} — {trigger.timeIntervalEnd}
                </Text>
              ) : (
                <Text color={"gray.600"} italic>
                  {i18n.t("notProvided")}
                </Text>
              )}
            </VStack>
          </Box>

          <Heading>{i18n.t("linkedHabits")}</Heading>
          <ScrollView>

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
                <Text>{i18n.t("thereAreNoLinkedHabits")}</Text>
            )}
          </ScrollView>
        </VStack>
        <Button
          marginX={2}
          marginY={3}
          onPress={() => {
            navigation.navigate("ManageTrigger");
          }}
        >
          {i18n.t("edit")}
        </Button>
    </Flex>
  );
}

export default observer(TriggerPage);
