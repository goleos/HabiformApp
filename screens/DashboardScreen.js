import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import { DatabaseController } from "../controllers/DatabaseController";
import { useEffect } from "react";
import { Button } from "native-base";
import {dbController} from "../controllers/DatabaseController";

function DashboardScreen() {


  const handleButton = () => {
    dbController.initialiseDatabase()
  };

  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      {/*<Text>{dbController.names.toString()}</Text>*/}
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
