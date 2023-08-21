import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import { dbController } from "../controllers/DatabaseController";
import { Button } from "native-base";
import { habitsController } from "../controllers/HabitsController";

function DashboardScreen() {

  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <Text>{habitsController.habits.toString()}</Text>
      <Button onPress={handleButton}>Press</Button>
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

export default observer(DashboardScreen);
