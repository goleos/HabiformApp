// https://docs.nativebase.io/next/form-control#page-title

import { Formik } from "formik";
import * as Yup from "yup";
import Habit from "../models/habit";
import {
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { habitFormValidationSchema } from "../utils/FormValidationSchemas";
import { habitsController } from "../controllers/HabitsController";

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
