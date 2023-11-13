// https://docs.nativebase.io/next/form-control#page-title

import { Formik } from "formik";
import Habit from "../models/habit";
import {
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Select,
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
import IntentionsList from "./IntentionsList";
import BoxStack from "./boxes/BoxStack";
import { Switch } from "react-native";
import HabitStatus from "../models/habitStatus";
import {i18n} from "../utils/localisation";

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
              <FormControl.Label>{i18n.t("habitNameHeader")}</FormControl.Label>
              <Input value={values.name} onChangeText={handleChange("name")} />
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.triggerEventID}>
              <FormControl.Label>{i18n.t("linkATriggerHeader")}</FormControl.Label>
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
              <Text>{i18n.t("receiveRemindersSwitch")}</Text>
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
              <Text>{i18n.t("markAsFormedSwitch")}</Text>
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
                ? i18n.t("startHabitNow")
                : i18n.t("updateAndMakeActive")}
            </Button>
            {!(values.habitStatus === "draft" && !formIsInAddMode) && (
              <Button
                variant={"outline"}
                onPress={() => {
                  setFieldValue("habitStatus", "draft");
                  handleSubmit();
                }}
              >
                {formIsInAddMode ? i18n.t("keepHabitAsDraft") : i18n.t("moveToDraft")}
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
                  {i18n.t("deleteHabit")}
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
                  {i18n.t("archiveHabit")}
                </Button>
              </HStack>
            )}
          </VStack>
        </Flex>
      )}
    </Formik>
  );
}
