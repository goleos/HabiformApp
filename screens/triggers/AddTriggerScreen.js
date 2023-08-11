import { View } from "react-native";
import {
  Button,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  TextArea,
  Alert,
  useToast,
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { triggersController } from "../../controllers/TriggersController";
import Trigger, { trig } from "../../models/trigger";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { weekdays, weekdaysShort } from "../../constants";
import TimeIntervalSelector from "../../components/TimeIntervalSelector";

export default function AddTriggerScreen({ navigation }) {
  const [triggerName, setTriggerName] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [hasTime, setHasTime] = useState(false);
  const [applicableDays, setApplicableDays] = useState(weekdays);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const toast = useToast();

  const handleAddTrigger = () => {
    const trigger = new Trigger();
    trigger.name = triggerName;
    trigger.extraNotes = extraNotes;
    trigger.timeIntervalStart = startTime;
    trigger.timeIntervalEnd = endTime;
    triggersController.createNewTrigger(trigger, handleCreatedSuccess, handleCreatedFailure);
  };

  const handleCreatedSuccess = () => {
    navigation.navigate("My Triggers");
    toast.show({
      description: "Trigger successfully created",
    });
  };

  const handleCreatedFailure = () => {
    toast.show({
      description: "Error creating a trigger",
    });
  }

  const handleSelectDay = (day, index) => {
    if (applicableDays.includes(day)) {
      setApplicableDays(
        applicableDays.filter((dayIn) => {
          return dayIn !== day;
        })
      );
    } else {
      setApplicableDays(...applicableDays, day);
    }
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
        <HStack
          alignItems="center"
          justifyContent="space-between"
          marginTop={3}
        >
          <Text>Occurs at predictable times</Text>
          <Switch value={hasTime} onValueChange={setHasTime} size="sm" />
        </HStack>
        {/*https://github.com/react-native-datetimepicker/datetimepicker*/}
        {hasTime && (
          <TimeIntervalSelector
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        )}
        <Text>Extra notes</Text>
        <TextArea value={extraNotes} onChangeText={setExtraNotes} h={100} />
        <Button
          borderRadius={18}
          onPress={handleAddTrigger}
          bg="triggerColour.100"
        >
          Add Trigger
        </Button>
      </Stack>
    </View>
  );
}
