import { View } from "react-native";
import {
  Button,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  TextArea,
  Alert,
  useToast, Flex,
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { triggersController } from "../../controllers/TriggersController";
import Trigger, { trig } from "../../models/trigger";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { weekdays, weekdaysShort } from "../../utils/constants";
import TimeIntervalSelector from "../../components/TimeIntervalSelector";
import ManageTriggerForm from "../../components/ManageTriggerForm";

export default function ManageTriggerScreen({ navigation, route }) {

  return (
      <Flex height={"100%"} bg={"white"}>
        <ManageTriggerForm trigger={route.params.trigger} onCreateOrEdit={() => {
          navigation.goBack()
        }} onDelete={() => {
          navigation.navigate('My Triggers')
        }} />
      </Flex>

  );
}
