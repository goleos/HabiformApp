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

function TriggersScreen({ navigation }) {
  const alertText =
    "Triggers are actions that you already do regularly. Linking a desired habit to a behaviour you already do inreases your chance of regularly repeating your habit";

  return (
    <>
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        bgColor="triggerColour.100"
        size="lg"
        icon={<Icon name="add" as={Ionicons} />}
        onPress={() => {
          navigation.navigate("ManageTrigger", {
            trigger: null,
          });
        }}
      />
      <InfoAlert heading={"Tip"} text={alertText} />
      {/*<Stack direction="column" padding={1}>*/}
      {/*  <TriggerListItem trigger={trig} />*/}
      {/*  <TriggerListItem trigger={trig} />*/}
      {/*  <TriggerListItem trigger={trig} />*/}
      {/*</Stack>*/}
      <ScrollView>
        {triggersController.triggers.map((trigger) => (
          <Pressable
            key={trigger.triggerEventID}
            onPress={() => {
              navigation.navigate("Trigger", {
                trigger: trigger,
              });
            }}
          >
            <TriggerListItem navigation={navigation} trigger={trigger} />
          </Pressable>
        ))}
      </ScrollView>
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
