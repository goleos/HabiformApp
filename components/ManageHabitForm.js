// https://docs.nativebase.io/next/form-control#page-title

import { Form, Formik } from "formik";
import * as Yup from "yup";
import Habit from "../models/habit";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { habitFormValidationSchema } from "../utils/FormValidationSchemas";
import {
  cancelHabitNotification,
  habitsController,
} from "../controllers/HabitsController";
import { triggersController } from "../controllers/TriggersController";
import IntentionListItem from "./listItems/IntentionListItem";
import IntentionsList from "./IntentionsList";
import BoxStack from "./boxes/BoxStack";
import { Switch } from "react-native";
import HabitStatus from "../models/habitStatus";

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
        // console.log("succ");
      },
      () => {
        // console.log("no");
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
        <Flex height={"100%"} justifyContent={"space-between"} space={10}>
          <VStack id={"basic-info"} space={3}>
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
                  // console.log("set");
                  setFieldValue("triggerEventID", itemValue);
                  // console.log(values.triggerEventID);
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
          </VStack>

          <VStack space={1}>
            {/*<Heading>Implementation intentions</Heading>*/}
            <IntentionsList
              intentions={values.intentions}
              onChange={(intentions) => {
                setFieldValue("intentions", intentions);
              }}
            />
          </VStack>

          <BoxStack>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text>Receive reminder notifications</Text>
              <Switch
                trackColor={{ true: "#2061c8" }}
                value={!!values.shouldNotify}
                onValueChange={(boolValue) => {
                  // console.log(boolValue);
                  setFieldValue("shouldNotify", boolValue ? 1 : 0);
                  // console.log(values);
                }}
              />
            </HStack>
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text>Mark habit as formed</Text>
              <Switch
                trackColor={{ true: "#2061c8" }}
                value={!!values.isFormed}
                onValueChange={(boolValue) => {
                  // console.log(boolValue);
                  setFieldValue("isFormed", boolValue ? 1 : 0);
                  // console.log(values);
                }}
              />
            </HStack>
          </BoxStack>

          <VStack space={2}>
            <Button
              onPress={() => {
                setFieldValue("habitStatus", "active");
                handleSubmit();
              }}
            >
              {formIsInAddMode
                ? "Start habit now"
                : "Update habit and make it active"}
            </Button>
            {!(values.habitStatus === "draft" && !formIsInAddMode) && (
              <Button
                variant={"outline"}
                onPress={() => {
                  setFieldValue("habitStatus", "draft");
                  handleSubmit();
                }}
              >
                {formIsInAddMode ? "Keep habit as draft" : "Move to draft"}
              </Button>
            )}
            {!formIsInAddMode && (
              <HStack justifyContent={"space-between"}>
                <Button
                  width={"50%"}
                  colorScheme={"delete"}
                  onPress={() => {
                    cancelHabitNotification(new Habit(values));
                    handleDelete(values.habitID);
                  }}
                >
                  Delete Habit
                </Button>
                <Button
                  width={"50%"}
                  variant={"outline"}
                  colorScheme={"delete"}
                  onPress={() => {
                    setFieldValue("habitStatus", HabitStatus.Archived);
                    handleSubmit();
                  }}
                >
                  Archive Habit
                </Button>
              </HStack>
            )}
          </VStack>
        </Flex>
      )}
    </Formik>
  );
}
