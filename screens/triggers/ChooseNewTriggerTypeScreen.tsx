import AppScreen from "../../components/AppScreen";
import TriggerTypeListItem from "../../components/listItems/TriggerTypeListItem";
import {focusedTriggerController} from "../../controllers/FocusedTriggerController";

export default function ChooseNewTriggerTypeScreen({ navigation }) {

    const handleCreate = (triggerType: "SimpleTrigger" | "TimeIntervalTrigger" | "LocationTrigger" | "AutomationTrigger") => {
        navigation.goBack();
        focusedTriggerController.newTrigger(triggerType);
        navigation.navigate("ManageTrigger");
    }

  return (
    <AppScreen spaceBetween={false}>
      <TriggerTypeListItem
        materialIcon={"clock-out"}
        title={"Time-based trigger"}
        description={
          "In this case, your trigger occurs in a predictable time interval. You will receive a habit reminder based on the start time of the interval"
        }
        onPress={handleCreate.bind(this, "TimeIntervalTrigger")}
      />
      <TriggerTypeListItem
        materialIcon={"map-marker-radius"}
        title={"Location-based trigger"}
        description={"For example, when I arrive to the office"}
      />
      <TriggerTypeListItem
        materialIcon={"robot"}
        title={"Smart automation trigger"}
        description={"Use Apple Shortcuts or deep links to simulate a trigger"}
      />
      <TriggerTypeListItem
        materialIcon={"calendar-question"}
        title={"Whenever happens"}
        description={
          "A trigger that you can't link to a time, location or create an automation for. In this case the app cannot remind you about the habit."
        }
        onPress={handleCreate.bind(this, "SimpleTrigger")}
      />
    </AppScreen>
  );
}
