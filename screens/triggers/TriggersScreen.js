import TriggerListItem from "../../components/TriggerListItem";
import { trig } from "../../models/trigger";
import { Fab, Icon, Stack, Text, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TriggersScreen({ navigation }) {
  return (
    <View backgroundColor="white">
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        bgColor="triggerColour.100"
        size="lg"
        icon={<Icon name="add" as={Ionicons} />}
        onPress={() => {
          navigation.navigate("Add trigger");
        }}
      />
      <Text alignSelf="center" padding={3}>
        Triggers are actions that you already do regularly. Linking a desired
        habit to a behaviour you already do inreases your chance of regularly
        repeating your habit.
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
