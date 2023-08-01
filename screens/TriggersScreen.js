import { StyleSheet, Text, View } from "react-native";
import TriggerItem from "../components/TriggerItem";
import {trig} from "../models/trigger";

export default function TriggersScreen() {
  return (
    <View style={styles.container}>
      <Text>Triggers Screen</Text>
      <TriggerItem trigger={trig}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
