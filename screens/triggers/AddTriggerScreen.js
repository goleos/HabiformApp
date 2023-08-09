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
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { triggersController } from "../../controllers/TriggersController";
import Trigger, { trig } from "../../models/trigger";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { weekdays, weekdaysShort } from "../../constants";

export default function AddTriggerScreen() {
  const [triggerName, setTriggerName] = useState("");
  const [extraNotes, setExtraNotes] = useState("");
  const [hasTime, setHasTime] = useState(false);
  const [applicableDays, setApplicableDays] = useState(weekdays);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleAddTrigger = () => {
    const trigger = new Trigger();
    trigger.name = triggerName;
    trigger.extraNotes = extraNotes;
    trigger.timeIntervalStart = startTime;
    trigger.timeIntervalEnd = endTime;
    triggersController.createNewTrigger(trigger);
  };

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
          <Stack>
            <Alert maxW="400" status="info" colorScheme="info">
              Providing an approximate daily time interval in which your trigger
              event occurs lets the app remind you when you should complete your
              habit
            </Alert>
            <HStack justifyContent="center" alignItems="center">
              <RNDateTimePicker
                display="inline"
                mode="time"
                value={new Date(2021, 12, 4, 4, 12)}
                onChange={(event, date) => {
                  setStartTime(date.toTimeString().split(" ")[0]);
                }}
              />
              <Text>—</Text>
              <RNDateTimePicker
                mode="time"
                value={new Date(2021, 12, 4, 4, 12)}
                onChange={(event, date) => {
                  setEndTime(date.toTimeString().split(" ")[0]);
                }}
              />
            </HStack>
            {/*<Button.Group isAttached>*/}
            {/*  {weekdaysShort.map((day, index) => (*/}
            {/*    <Button*/}
            {/*      key={index}*/}
            {/*      variant={applicableDays.includes(day) ? "solid" : "outline"}*/}
            {/*      onPress={() => {*/}
            {/*        handleSelectDay(day, index);*/}
            {/*        console.log(applicableDays);*/}
            {/*      }}*/}
            {/*    >*/}
            {/*      {day}*/}
            {/*    </Button>*/}
            {/*  ))}*/}
            {/*</Button.Group>*/}
          </Stack>
        )}
        <Text>Extra notes</Text>
        <TextArea value={extraNotes} onChangeText={setExtraNotes} h={100} />
        <Button onPress={handleAddTrigger} bg="triggerColour.100">
          Add Trigger
        </Button>
      </Stack>
    </View>
  );
}
