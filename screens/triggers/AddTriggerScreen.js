import { View } from "react-native";
import {
  Button,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  TextArea,
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { triggersController } from "../../controllers/TriggersController";
import Trigger, { trig } from "../../models/trigger";
import { useState } from "react";

export default function AddTriggerScreen() {
  const [triggerName, setTriggerName] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  const handleAddTrigger = () => {
    const trigger = new Trigger();
    trigger.name = triggerName;
    trigger.extraNotes = extraNotes;
    triggersController.createNewTrigger(trigger);
  };

  return (
    <View>
      <Stack direction="column" padding={3} backgroundColor="white" space={2}>
        <Text>Trigger name</Text>
        <Input
          value={triggerName}
          onChangeText={setTriggerName}
          placeholder="eg. Starting dinner, leaving for home after work"
        />
        <HStack alignItems="center" justifyContent="space-between" marginY={3}>
          <Text>Occurs at predictable times</Text>
          <Switch size="sm" />
        </HStack>
        {/*https://github.com/react-native-datetimepicker/datetimepicker*/}
        <RNDateTimePicker mode="time" value={new Date(2021, 12, 4, 4, 12)} />
        <Text>Extra notes</Text>
        <TextArea value={extraNotes} onChangeText={setExtraNotes} h={100} />
        <Button onPress={handleAddTrigger} bg="triggerColour.100">
          Add Trigger
        </Button>
      </Stack>
    </View>
  );
}
