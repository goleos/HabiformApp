import TriggerListItem from "../../components/TriggerListItem";
import { trig } from "../../models/trigger";
import { Fab, Icon, ScrollView, Stack, Text, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { habitsController } from "../../controllers/HabitsController";
import HabitListItem from "../../components/HabitListItem";
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
                  navigation.navigate("Add trigger");
              }}
          />
          <Text alignSelf="center" padding={3}>
              Triggers are actions that you already do regularly. Linking a desired
              habit to a behaviour you already do inreases your chance of regularly
              repeating your habit.
          </Text>
          {/*<Stack direction="column" padding={1}>*/}
          {/*  <TriggerListItem trigger={trig} />*/}
          {/*  <TriggerListItem trigger={trig} />*/}
          {/*  <TriggerListItem trigger={trig} />*/}
          {/*</Stack>*/}
          <ScrollView>
              {triggersController.triggers.map((trigger) => (
                  <TriggerListItem trigger={trigger} key={trigger.triggerEventID} />
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
