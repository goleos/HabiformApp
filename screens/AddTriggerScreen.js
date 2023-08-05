import { StyleSheet, View } from "react-native";
import {HStack, Switch, Text, TextArea} from "native-base";
import { Button, Input } from "native-base";
import { Stack } from "native-base";

export default function AddTriggerScreen() {
  return (
    <View>
      <Stack direction="column" padding={3} backgroundColor="white" space={2}>
        <Text>Trigger name</Text>
        <Input placeholder="eg. Starting dinner, leaving for home after work" />
          <HStack alignItems="center" justifyContent="space-between" marginY={3}>
              <Text>Occurs at predictable times</Text>
              <Switch size="sm" />
          </HStack>
        <Text>Extra notes</Text>
        <TextArea h={100} />
          <Button>Add Trigger</Button>
      </Stack>
    </View>
  );
}
