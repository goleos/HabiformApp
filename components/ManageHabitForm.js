// https://docs.nativebase.io/next/form-control#page-title

import { Form, Formik } from "formik";
import * as Yup from "yup";
import Habit from "../models/habit";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { habitFormValidationSchema } from "../utils/FormValidationSchemas";
import { habitsController } from "../controllers/HabitsController";
import { triggersController } from "../controllers/TriggersController";
import IntentionListItem from "./IntentionListItem";
import IntentionsList from "./IntentionsList";

export default function ManageHabitForm({ habit, onCreateOrEdit, onDelete }) {
  let initialValues;
  if (habit === null) {
    initialValues = { ...new Habit() };
  } else {
    initialValues = { ...habit };
  }

  const formIsInAddMode = !initialValues.habitID;

  const toast = useToast();

  const handleSubmitForm = (values) => {
    habitsController.createNewHabit(
      new Habit(values),
      () => {
        console.log("succ");
      },
      () => {
        console.log("no");
      }
    );
    onCreateOrEdit();
  };

  const handleDelete = (habitID) => {
    habitsController.deleteHabit(habitID, () => {
      toast.show({ description: "Habit deleted" });
      onDelete();
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmitForm}
      validationSchema={habitFormValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <VStack space={10}>
          <FormControl isInvalid={errors.name}>
            <FormControl.Label>Habit name</FormControl.Label>
            <Input value={values.name} onChangeText={handleChange("name")} />
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.triggerEventID}>
            <FormControl.Label>Link a trigger</FormControl.Label>
            <Select
              selectedValue={values.triggerEventID}
              onValueChange={(itemValue) => {
                console.log("set");
                setFieldValue("triggerEventID", itemValue);
                console.log(values.triggerEventID);
              }}
            >
              {triggersController.triggers.map((trigger) => (
                <Select.Item
                  label={trigger.name}
                  value={trigger.triggerEventID}
                  key={trigger.triggerEventID}
                />
              ))}
            </Select>
            <FormControl.ErrorMessage>
              {errors.triggerEventID}
            </FormControl.ErrorMessage>
          </FormControl>

          <VStack space={1}>
            <Heading>Implementation intentions</Heading>
            <IntentionsList
                intentions={values.intentions}
                onChange={(intentions) => {
                  setFieldValue("intentions", intentions);
                }}
            />
          </VStack>


          <VStack space={2}>
            <Button
              onPress={() => {
                setFieldValue("habitStatus", "active");
                handleSubmit();
              }}
            >
              {formIsInAddMode ? "Start habit now" : "Update habit"}
            </Button>
            {!(values.habitStatus === "draft" && !formIsInAddMode) && (
              <Button
                onPress={() => {
                  setFieldValue("habitStatus", "draft");
                  handleSubmit();
                }}
              >
                {formIsInAddMode ? "Keep habit as draft" : "Move to draft"}
              </Button>
            )}
            {!formIsInAddMode && (
              <Button
                onPress={() => {
                  handleDelete(values.habitID);
                }}
              >
                Delete Habit
              </Button>
            )}
          </VStack>
        </VStack>
      )}
    </Formik>
  );
}
