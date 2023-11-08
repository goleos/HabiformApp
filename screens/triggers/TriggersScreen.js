import TriggerListItem from "../../components/listItems/TriggerListItem";
import {Fab, Icon, Pressable, ScrollView, View, VStack} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { triggersController } from "../../controllers/TriggersController";
import { observer } from "mobx-react";
import InfoAlert from "../../components/InfoAlert";
import { focusedTriggerController } from "../../controllers/FocusedTriggerController";
import { triggerScheduleController } from "../../controllers/TriggerScheduleController";
import {i18n} from "../../utils/localisation";
import AppScreen from "../../components/AppScreen";

function TriggersScreen({ navigation }) {

  const handleCreateTrigger = () => {
    focusedTriggerController.newTrigger();
    navigation.navigate("ManageTrigger");
  };

  const handleViewTrigger = (trigger) => {
    focusedTriggerController.setTrigger(trigger);
    navigation.navigate("Trigger");
  };

  return (
    <AppScreen>
      <InfoAlert heading={i18n.t("tipAlertBoxName")} text={i18n.t("triggersScreenTip")} />
      <ScrollView>
        {triggersController.triggers.map((trigger) => (
          <Pressable
            key={trigger.triggerEventID}
            onPress={() => handleViewTrigger(trigger)}
          >
            <TriggerListItem navigation={navigation} trigger={trigger} />
          </Pressable>
        ))}
      </ScrollView>
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        bgColor="triggerColour.100"
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
