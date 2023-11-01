import TriggerListItem from "../../components/listItems/TriggerListItem";
import { trig } from "../../models/trigger";
import {
  Alert,
  Fab,
  Heading,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Stack,
  Text,
  View,
  VStack,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { habitsController } from "../../controllers/HabitsController";
import HabitListItem from "../../components/listItems/HabitListItem";
import { triggersController } from "../../controllers/TriggersController";
import { observer } from "mobx-react";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import InfoAlert from "../../components/InfoAlert";
import { focusedTriggerController } from "../../controllers/FocusedTriggerController";
import { triggerScheduleController } from "../../controllers/TriggerScheduleController";

function TriggersScreen({ navigation }) {
  const alertText =
    "Triggers are actions that you already do regularly. Linking a desired habit to a behaviour you already do inreases your chance of regularly repeating your habit";

  const handleCreateTrigger = () => {
    focusedTriggerController.newTrigger();
    triggerScheduleController.formSchedule();
    console.log("schedule:   ");
    console.log(triggerScheduleController.schedule);
    navigation.navigate("ManageTrigger");
  };

  const handleViewTrigger = (trigger) => {
    focusedTriggerController.setTrigger(trigger);
    navigation.navigate("Trigger");
  };

  return (
    <>
      <InfoAlert heading={"Tip"} text={alertText} />
      <ScrollView>
        {triggersController.triggers.map((trigger) => (
          <Pressable
            key={trigger.triggerEventID}
            onPress={() => handleViewTrigger(trigger)}
          >
            <TriggerListItem navigation={navigation} trigger={trigger} />
          </Pressable>
        ))}
      </ScrollView>
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        bgColor="triggerColour.100"
        size="lg"
        icon={<Icon name="add" as={Ionicons} />}
        onPress={handleCreateTrigger}
      />
    </>
  );
}

export default observer(TriggersScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
