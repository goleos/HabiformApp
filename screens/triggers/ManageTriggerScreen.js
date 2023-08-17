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
  useToast,
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { triggersController } from "../../controllers/TriggersController";
import Trigger, { trig } from "../../models/trigger";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { weekdays, weekdaysShort } from "../../constants";
import TimeIntervalSelector from "../../components/TimeIntervalSelector";
import ManageTriggerForm from "../../components/ManageTriggerForm";

export default function ManageTriggerScreen({ navigation, route }) {

  return (
    <ManageTriggerForm trigger={route.params.trigger} onCreateOrEdit={() => {
      navigation.goBack()
    }} onDelete={() => {
      navigation.navigate('My Triggers')
    }} />
  );
}
