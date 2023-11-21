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
import { Keyboard, Switch } from "react-native";
import TimeIntervalSelector from "./TimeIntervalSelector";
import { Formik } from "formik";
import InfoAlert from "./InfoAlert";
import { focusedTriggerController } from "../controllers/FocusedTriggerController";
import { triggerFormValidationSchema } from "../utils/FormValidationSchemas";
import { i18n } from "../utils/localisation";
import { TriggerType } from "../models/trigger";

export default function ManageTriggerForm(props) {
  let trigger: TriggerType;
  trigger = props.trigger as TriggerType;
  const toast = useToast();
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
          description: i18n.t("triggerCreatedMessage"),
        });
      },
      handleCreatedFailure
    );
  };

  const handleCreatedFailure = () => {
    toast.show({
      description: i18n.t("triggerErrorCreatedMessage"),
    });
  };

  const handleDeleteTrigger = () => {
    focusedTriggerController.delete(
      () => {
        props.onDelete();
        toast.show({
          description: i18n.t("triggerDeletedMessage"),
        });
      },
      (message) => {
        toast.show({
          description: message,
        });
      }
    );
  };

  // @ts-ignore
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
          justifyContent={"space-between"}
        >
          <VStack space={4}>
            <Text>{i18n.t("triggerName")}</Text>
            <Input
              value={values.name}
              onChangeText={handleChange("name")}
              placeholder={i18n.t("triggerNameInputExample")}
            />
            {/*// @ts-ignore*/}
            {errors.name && <Text color="red.500">{errors.name}</Text>}
            {trigger.triggerType === "TimeIntervalTrigger" && (
              <>
                <Text>{i18n.t("predictedTimeInterval")}</Text>
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
                  defaultStart={values.startTimeObjectOrDefault()}
                  defaultEnd={values.endTimeObjectOrDefault()}
                />
              </>
            )}
            <Text>{i18n.t("extraNotesHeader")}</Text>
            {/*// @ts-ignore*/}
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
                      description: i18n.t("startBeforeEndMessage"),
                    });
                  }
                } else {
                  handleSubmit();
                }
              }}
              colorScheme={"trigger"}
            >
              {formIsInAddMode
                ? i18n.t("addTriggerButtonText")
                : i18n.t("updateTriggerButtonText")}
            </Button>
            {!formIsInAddMode && (
              <Button
                colorScheme={"delete"}
                onPress={handleDeleteTrigger}
                bg="red.600"
              >
                {i18n.t("deleteTriggerButtonText")}
              </Button>
            )}
          </VStack>
        </Flex>
      )}
    </Formik>
  );
}
