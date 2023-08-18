// https://formik.org/docs/overview
// https://formik.org/docs/guides/react-native
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
// https://formik.org/docs/tutorial#schema-validation-with-yup
// https://github.com/jquense/yup

import { useState } from "react";
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
import { Formik } from "formik";
import * as Yup from "yup";

export default function ManageTriggerForm(props) {
  let trigger;
  if (props.trigger !== null) {
    trigger = props.trigger;
  } else {
    trigger = new Trigger();
  }
  const formIsInAddMode = !!trigger.triggerEventID;

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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .trim("Invalid name")
      .max(20, "Name can have at most 20 characters"),
  });

  const toast = useToast();

  const handleCreatedSuccess = () => {
    props.onCreateOrEdit();
    toast.show({
      description: "Trigger successfully created",
    });
  };

  const handleCreatedFailure = () => {
    toast.show({
      description: "Error creating a trigger",
    });
  };

  const handleDeleteTrigger = () => {
    props.onDelete();
    toast.show({
      description: "Trigger successfully deleted",
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
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
            {errors.name && <Text color='red.500'>{errors.name}</Text>}
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
                    console.log(
                      defaultIntervalStart.toTimeString().split(" ")[0]
                    );
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
                    setHasTime(false);
                    setFieldValue("timeIntervalStart", null);
                    setFieldValue("timeIntervalEnd", null);
                  }
                }}
                size="sm"
              />
            </HStack>
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
              onPress={() => {
                if (values.timeIntervalStart !== null) {
                  if (
                    parseInt(values.timeIntervalStart.split(":")[0]) <
                    parseInt(values.timeIntervalEnd.split(":")[0])
                  ) {
                    handleSubmit();
                  } else {
                      toast.show({
                        description: "Start time must be before end time",
                      });
                  }
                }
              }}
              bg="triggerColour.100"
            >
              Add Trigger
            </Button>
            {formIsInAddMode && (
              <Button
                borderRadius={18}
                onPress={() => {
                  triggersController.deleteTrigger(
                    values.triggerEventID,
                    handleDeleteTrigger
                  );
                }}
                bg="red.600"
              >
                Delete Trigger
              </Button>
            )}

          </Stack>
      )}
    </Formik>
  );
}
