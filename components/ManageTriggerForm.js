// https://formik.org/docs/overview
// https://formik.org/docs/guides/react-native
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
// https://formik.org/docs/tutorial#schema-validation-with-yup
// https://github.com/jquense/yup

import { useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  TextArea,
  useToast,
  VStack,
} from "native-base";
import Trigger from "../models/trigger";
import { triggersController } from "../controllers/TriggersController";
import { View } from "react-native";
import TimeIntervalSelector from "./TimeIntervalSelector";
import { Formik } from "formik";
import * as Yup from "yup";
import InfoAlert from "./InfoAlert";
import { Switch } from "react-native";
import { uiTheme } from "../utils/uiTheme";
import {focusedTriggerController} from "../controllers/FocusedTriggerController";

export default function ManageTriggerForm(props) {
  let trigger;
  if (props.trigger !== null) {
    trigger = props.trigger;
  } else {
    trigger = new Trigger();
  }
  const formIsInAddMode = !trigger.triggerEventID;

  const initialValues = { ...trigger };

  const onSubmit = (values) => {
    let newTrigger = new Trigger(values)
    focusedTriggerController.setTrigger(newTrigger)
    triggersController.createNewTrigger(
      newTrigger,
      handleCreatedSuccess,
      handleCreatedFailure
    );
    console.info("Creating trigger: " + values.toString());
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
        <Flex
          height={"100%"}
          direction="column"
          padding={3}
          backgroundColor="white"
          space={2}
          justifyContent={"space-between"}
        >
          <VStack space={4}>
            <Text>Trigger name</Text>
            <Input
              value={values.name}
              onChangeText={handleChange("name")}
              placeholder="eg. Starting dinner, leaving for home after work"
            />
            {errors.name && <Text color="red.500">{errors.name}</Text>}
            <InfoAlert
              heading={"Tip"}
              text={
                "Providing an approximate daily time interval in which your trigger event occurs lets the app remind you when you should complete your habit"
              }
            />

            <HStack
              alignItems="center"
              justifyContent="space-between"
              marginTop={3}
            >
              <Text>Occurs at predictable times</Text>
              <Switch
                trackColor={{ true: "#2061c8" }}
                value={hasTime}
                onValueChange={(boolValue) => {
                  if (boolValue === true) {
                    setFieldValue(
                      "timeIntervalStart",
                      defaultIntervalStart.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    );
                    setFieldValue(
                      "timeIntervalEnd",
                      defaultIntervalEnd.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
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
                  // console.log(value);
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
          </VStack>

          <VStack space={2}>
            <Button
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
                } else {
                  handleSubmit();
                }
              }}
              colorScheme={"trigger"}
            >
              {formIsInAddMode ? 'Add Trigger' : 'Update Trigger'}
            </Button>
            {!formIsInAddMode && (
              <Button
                colorScheme={"delete"}
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
          </VStack>
        </Flex>
      )}
    </Formik>
  );
}
