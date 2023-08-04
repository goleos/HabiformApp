import { StyleSheet } from "react-native";
import TriggerListItem from "../components/TriggerListItem";
import { trig } from "../models/trigger";
import { Stack } from "native-base";
import { NativeBaseProvider } from "native-base/src/core/NativeBaseProvider";
import {Text} from "native-base";
import {View} from "native-base"
import ContentBox from '../components/ContentBox'

export default function TriggersScreen() {
  return (
<View backgroundColor="white">
    <Text alignSelf="center" padding={3}>
        Triggers are actions that you already do regularly. Linking a desired habit to a behaviour you already do inreases your chance of regularly repeating your habit.
    </Text>
    <Stack direction="column" padding={1}>
        <TriggerListItem trigger={trig} />
        <TriggerListItem trigger={trig} />
        <TriggerListItem trigger={trig} />
    </Stack>
</View>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
