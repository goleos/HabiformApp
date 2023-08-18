// https://docs.nativebase.io/next/form-control#page-title

import { Formik } from "formik";
import * as Yup from "yup";
import Habit from "../models/habit";
import { Button, FormControl, Input, Stack, Text, VStack } from "native-base";
import { habitFormValidationSchema } from "../utils/FormValidationSchemas";
import { habitsController } from "../controllers/HabitsController";

export default function ManageHabitForm({ habit, onCreateOrEdit }) {
  let initialValues;
  if (habit !== null) {
    initialValues = { ...new Habit() };
  } else {
    initialValues = { ...habit };
  }

  const formIsInAddMode = !initialValues.habitID;

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
        <VStack space={1}>
          <FormControl isInvalid={errors.name}>
            <FormControl.Label>Habit name</FormControl.Label>
            <Input value={values.name} onChangeText={handleChange("name")} />
            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
          </FormControl>
          <Button onPress={handleSubmit}>
            {formIsInAddMode ? "Create Habit" : "Update Habit"}
          </Button>
        </VStack>
      )}
    </Formik>
  );
}
