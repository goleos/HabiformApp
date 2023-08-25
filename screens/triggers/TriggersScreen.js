import TriggerListItem from "../../components/listItems/TriggerListItem";
import { trig } from "../../models/trigger";
import {Alert, Fab, Icon, Pressable, ScrollView, Stack, Text, View} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { habitsController } from "../../controllers/HabitsController";
import HabitListItem from "../../components/listItems/HabitListItem";
import { triggersController } from "../../controllers/TriggersController";
import { observer } from "mobx-react";
import { useState } from "react";

function TriggersScreen({ navigation }) {

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
      <Alert
        marginX={2}
        marginY={1}
        borderRadius={10}
        shadow={2}
        maxW="400"
        status="info"
        colorScheme="info"
      >
        Triggers are actions that you already do regularly. Linking a desired
        habit to a behaviour you already do inreases your chance of regularly
        repeating your habit
      </Alert>
      {/*<Stack direction="column" padding={1}>*/}
      {/*  <TriggerListItem trigger={trig} />*/}
      {/*  <TriggerListItem trigger={trig} />*/}
      {/*  <TriggerListItem trigger={trig} />*/}
      {/*</Stack>*/}
      <ScrollView>
        {triggersController.triggers.map((trigger) => (
            <Pressable key={trigger.triggerEventID} onPress={() => {
                navigation.navigate("Trigger", {
                    trigger: trigger,
                })}}>
                <TriggerListItem
                    navigation={navigation}
                    trigger={trigger}

                />
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
