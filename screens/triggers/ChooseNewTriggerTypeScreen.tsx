import AppScreen from "../../components/AppScreen";
import TriggerTypeListItem from "../../components/listItems/TriggerTypeListItem";
import {focusedTriggerController} from "../../controllers/FocusedTriggerController";
import {i18n} from "../../utils/localisation";

export default function ChooseNewTriggerTypeScreen({ navigation }) {

    const handleCreate = (triggerType: "SimpleTrigger" | "TimeIntervalTrigger" | "LocationTrigger" | "AutomationTrigger") => {
        focusedTriggerController.newTrigger(triggerType);
        navigation.navigate("ManageTrigger");
    }

  return (
    <AppScreen spaceBetween={false}>
      <TriggerTypeListItem
        materialIcon={"clock-out"}
        title={i18n.t("timeBasedTrigger")}
        description={
          i18n.t("timeBasedTriggerDescription")
        }
        onPress={handleCreate.bind(this, "TimeIntervalTrigger")}
      />
      {/*  TODO: Return these options when they are implemented*/}
      {/*<TriggerTypeListItem*/}
      {/*  materialIcon={"map-marker-radius"}*/}
      {/*  title={i18n.t("locationBasedTrigger")}*/}
      {/*  description={i18n.t("locationBasedTriggerDescription")}*/}
      {/*/>*/}
      {/*<TriggerTypeListItem*/}
      {/*  materialIcon={"robot"}*/}
      {/*  title={i18n.t("smartAutomationTrigger")}*/}
      {/*  description={i18n.t("smartAutomationTriggerDescription")}*/}
      {/*/>*/}
      <TriggerTypeListItem
        materialIcon={"calendar-question"}
        title={i18n.t("simpleTriggerTitle")}
        description={
          i18n.t("simpleTriggerDescription")
        }
        onPress={handleCreate.bind(this, "SimpleTrigger")}
      />
    </AppScreen>
  );
}
