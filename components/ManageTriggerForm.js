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
  Text,
  TextArea,
  useToast,
  VStack,
} from "native-base";
import { Switch } from "react-native";
import TimeIntervalSelector from "./TimeIntervalSelector";
import { Formik } from "formik";
import InfoAlert from "./InfoAlert";
import { focusedTriggerController } from "../controllers/FocusedTriggerController";
import { triggerFormValidationSchema } from "../utils/FormValidationSchemas";

export default function ManageTriggerForm(props) {
  let trigger = props.trigger;
  const formIsInAddMode = !trigger.triggerEventID;

  const localeTimeOptions = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  const onSubmit = (values) => {
    console.info("Creating trigger: " + values.toString());
    focusedTriggerController.insertOrUpdate(
      values,
      () => {
        props.onCreateOrEdit();
        toast.show({
          description: "Trigger successfully created",
        });
      },
      handleCreatedFailure
    );
  };

  let startHour;
  let startMinute;
  let endHour;
  let endMinute;

  if (trigger.timeIntervalStart !== null) {
    startHour = parseInt(trigger.timeIntervalStart.split(":")[0]);
    startMinute = parseInt(trigger.timeIntervalStart.split(":")[1]);
    endHour = parseInt(trigger.timeIntervalEnd.split(":")[0]);
    endMinute = parseInt(trigger.timeIntervalEnd.split(":")[1]);
  } else {
    startHour = 7;
    startMinute = 0;
    endHour = 8;
    endMinute = 0;
  }

  const defaultIntervalStart = new Date(2021, 12, 4, startHour, startMinute);
  const defaultIntervalEnd = new Date(2021, 12, 4, endHour, endMinute);

  const [hasTime, setHasTime] = useState(!!trigger.timeIntervalStart);

  const toast = useToast();

  const handleCreatedFailure = () => {
    toast.show({
      description: "Error creating a trigger",
    });
  };

  const handleDeleteTrigger = () => {
    focusedTriggerController.delete(() => {
      props.onDelete();
      toast.show({
        description: "Trigger successfully deleted",
      });
    });
  };

  return (
    <Formik
      initialValues={trigger}
      onSubmit={onSubmit}
      validationSchema={triggerFormValidationSchema}
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
                      defaultIntervalStart.toLocaleTimeString(
                        [],
                        localeTimeOptions
                      )
                    );
                    setFieldValue(
                      "timeIntervalEnd",
                      defaultIntervalEnd.toLocaleTimeString(
                        [],
                        localeTimeOptions
                      )
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
                  setFieldValue(
                    "timeIntervalStart",
                    value.toLocaleTimeString(["en-GB"], localeTimeOptions)
                  );
                }}
                onEndTimeChange={(value) => {
                  setFieldValue(
                    "timeIntervalEnd",
                    value.toLocaleTimeString(["en-GB"], localeTimeOptions)
                  );
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
                    values.startTimeAsDateObject() <
                    values.endTimeAsDateObject()
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
              {formIsInAddMode ? "Add Trigger" : "Update Trigger"}
            </Button>
            {!formIsInAddMode && (
              <Button
                colorScheme={"delete"}
                onPress={handleDeleteTrigger}
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
