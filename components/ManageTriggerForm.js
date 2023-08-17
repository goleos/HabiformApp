// https://formik.org/docs/overview
// https://formik.org/docs/guides/react-native
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example

import { useState } from "react";
import { weekdays } from "../constants";
import {
  Button,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  TextArea,
  useToast,
} from "native-base";
import Trigger from "../models/trigger";
import { triggersController } from "../controllers/TriggersController";
import { View } from "react-native";
import TimeIntervalSelector from "./TimeIntervalSelector";
import { Formik, useFormik } from "formik";

export default function ManageTriggerForm(props) {
  let trigger;
  if (props.trigger != null) {
    trigger = props.trigger;
  } else {
    trigger = new Trigger();
  }
  const formIsInAddMode = !trigger.triggerEventID;

  const initialValues = { ...trigger };

  const onSubmit = (values) => {
    triggersController.createNewTrigger(
      new Trigger(values),
      handleCreatedSuccess,
      handleCreatedFailure
    );
    console.log("creating trigger: " + values.toString());
  };

  let startHour;
  let startMinute;
  let endHour;
  let endMinute;

  if (initialValues.timeIntervalStart !== null) {
    startHour = parseInt(initialValues.timeIntervalStart.split(":")[0]);
    startMinute = parseInt(initialValues.timeIntervalStart.split(":")[1]);
    endHour = parseInt(initialValues.timeIntervalEnd.split(":")[0]);
    endMinute = parseInt(initialValues.timeIntervalEnd.split(":")[1]);
  } else {
    startHour = 7;
    startMinute = 0;
    endHour = 8;
    endMinute = 0;
  }

  const defaultIntervalStart = new Date(2021, 12, 4, startHour, startMinute);
  const defaultIntervalEnd = new Date(2021, 12, 4, endHour, endMinute);

  const [hasTime, setHasTime] = useState(!!initialValues.timeIntervalStart);

  const toast = useToast();

  const handleCreatedSuccess = () => {
    // navigation.navigate("My Triggers");
    toast.show({
      description: "Trigger successfully created",
    });
  };

  const handleCreatedFailure = () => {
    toast.show({
      description: "Error creating a trigger",
    });
  };

  // const handleSelectDay = (day, index) => {
  //   if (applicableDays.includes(day)) {
  //     setApplicableDays(
  //       applicableDays.filter((dayIn) => {
  //         return dayIn !== day;
  //       })
  //     );
  //   } else {
  //     setApplicableDays(...applicableDays, day);
  //   }
  // };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <View>
          <Stack
            direction="column"
            padding={3}
            backgroundColor="white"
            space={2}
          >
            <Text>Trigger name</Text>
            <Input
              value={values.name}
              onChangeText={handleChange("name")}
              placeholder="eg. Starting dinner, leaving for home after work"
            />
            <HStack
              alignItems="center"
              justifyContent="space-between"
              marginTop={3}
            >
              <Text>Occurs at predictable times</Text>
              <Switch
                value={hasTime}
                onValueChange={(boolValue) => {
                  if (boolValue === true) {
                    console.log("value ch");
                    setFieldValue(
                      "timeIntervalStart",
                      defaultIntervalStart.toTimeString().split(" ")[0]
                    );
                    setFieldValue(
                      "timeIntervalEnd",
                      defaultIntervalEnd.toTimeString().split(" ")[0]
                    );
                    setHasTime(true);
                  } else {
                    setFieldValue("timeIntervalStart", null);
                    setFieldValue("timeIntervalEnd", null);
                    setHasTime(false);
                  }
                }}
                size="sm"
              />
            </HStack>
            {/*https://github.com/react-native-datetimepicker/datetimepicker*/}
            {hasTime && (
              <TimeIntervalSelector
                onStartTimeChange={(value) => {
                  console.log(value);
                  setFieldValue("timeIntervalStart", value);
                }}
                onEndTimeChange={(value) => {
                  setFieldValue("timeIntervalEnd", value);
                }}
                defaultStart={defaultIntervalStart}
                defaultEnd={defaultIntervalEnd}
              />
            )}
            <Text>Extra notes</Text>
            <TextArea
              value={values.extraNotes}
              onChangeText={handleChange("extraNotes")}
              h={100}
            />
            <Button
              borderRadius={18}
              onPress={handleSubmit}
              bg="triggerColour.100"
            >
              Add Trigger
            </Button>
          </Stack>
        </View>
      )}
    </Formik>
  );
}
