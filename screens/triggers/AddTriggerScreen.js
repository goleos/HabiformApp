import { View } from "react-native";
import {
  Button,
  HStack,
  Input,
  Stack,
  Switch,
  Text,
  TextArea,
} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { triggersController } from "../../controllers/TriggersController";
import { trig } from "../../models/trigger";


export default function AddTriggerScreen() {
  const handleAddTrigger = () => {
    console.log("aa");
    triggersController.createNewTrigger(trig);
  };

  return (
    <View>
      <Stack direction="column" padding={3} backgroundColor="white" space={2}>
        <Text>Trigger name</Text>
        <Input placeholder="eg. Starting dinner, leaving for home after work" />
        <HStack alignItems="center" justifyContent="space-between" marginY={3}>
          <Text>Occurs at predictable times</Text>
          <Switch size="sm" />
        </HStack>
        {/*https://github.com/react-native-datetimepicker/datetimepicker*/}
        <RNDateTimePicker mode="time" value={new Date(2021, 12, 4, 4, 12)} />
        <Text>Extra notes</Text>
        <TextArea h={100} />
        <Button onPress={handleAddTrigger} bg="triggerColour.100">
          Add Trigger
        </Button>
      </Stack>
    </View>
  );
}
