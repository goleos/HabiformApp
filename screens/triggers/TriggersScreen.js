import TriggerListItem from "../../components/listItems/TriggerListItem";
import {
  Fab,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  View,
  VStack,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { triggersController } from "../../controllers/TriggersController";
import { observer } from "mobx-react";
import InfoAlert from "../../components/InfoAlert";
import { focusedTriggerController } from "../../controllers/FocusedTriggerController";
import { triggerScheduleController } from "../../controllers/TriggerScheduleController";
import { i18n } from "../../utils/localisation";
import AppScreen from "../../components/AppScreen";
import { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native";
import HeaderIconButton from "../../components/navheader/HeaderIconButton";

function TriggersScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      // headerRight: () => (
      //   <HeaderIconButton
      //     materialIconName={"plus-circle"}
      //     onPress={handleCreateTrigger}
      //     mr={-2}
      //     mt={-1}
      //   />
      // ),
    });
  }, []);

  const handleCreateTrigger = () => {
    navigation.navigate("ManageTriggerNavigator");
  };

  const handleViewTrigger = (trigger) => {
    focusedTriggerController.setTrigger(trigger);
    navigation.navigate("Trigger");
  };

  return (
    <AppScreen>
      <InfoAlert
        heading={i18n.t("tipAlertBoxName")}
        text={i18n.t("triggersScreenTip")}
      />
      <ScrollView>
        {triggersController.triggers.map((trigger) => (
          <TriggerListItem
            key={trigger.triggerEventID}
            onPress={() => handleViewTrigger(trigger)}
            navigation={navigation}
            trigger={trigger}
          />
        ))}
      </ScrollView>
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        colorScheme="primary"
        size="lg"
        icon={<Icon name="add" as={Ionicons} />}
        onPress={handleCreateTrigger}
      />
    </AppScreen>
  );
}

export default observer(TriggersScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
