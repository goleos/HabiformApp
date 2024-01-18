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
import { i18n } from "../../utils/localisation";
import { SimpleTrigger, TriggerType } from "../../models/trigger";
import AppScreen from "../../components/AppScreen";
import SubDescription from "../../components/SubDescription";

function TriggerPage({ navigation }) {
  const trigger = focusedTriggerController.trigger as TriggerType;
  const linkedHabits = focusedTriggerController.getLinkedHabits();

  const timeIntervalData =
    trigger.timeIntervalStart != null
      ? trigger.timeIntervalStart + "—" + trigger.timeIntervalEnd
      : i18n.t("notProvided");

  return (
    <AppScreen>
      <ScrollView>
        <VStack margin={2} space={2}>
          <HeadingWithIcon
            iconName={"clock-out"}
            headingText={trigger.name}
            bodyText={trigger.extraNotes}
          />

          <SubDescription
            iconName={"time"}
            title={i18n.t("estimatedTimeInterval")}
            value={timeIntervalData}
          />

          <Heading>{i18n.t("linkedHabits")}</Heading>

          {linkedHabits.length !== 0 ? (
            linkedHabits.map((habit) => {
              return (
                <HabitListItem
                  hideArrowButton={true}
                  habit={habit}
                  key={habit.habitID}
                  onPress={undefined}
                />
              );
            })
          ) : (
            <Text>{i18n.t("thereAreNoLinkedHabits")}</Text>
          )}
        </VStack>
      </ScrollView>
      <Button
        marginX={2}
        marginY={3}
        onPress={() => {
          navigation.navigate("ManageTrigger");
        }}
      >
        {i18n.t("edit")}
      </Button>
    </AppScreen>
  );
}

export default observer(TriggerPage);
