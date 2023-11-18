import { View, Text, Heading, HStack, Flex, VStack } from "native-base";
import AppScreen from "../../components/AppScreen";
import ContentBox from "../../components/ContentBox";
import { Icon } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TriggerTypeListItem from "../../components/listItems/TriggerTypeListItem";
import { Spacer } from "native-base";

export default function ChooseNewTriggerTypeScreen({ navigation }) {

    const handlePress = () => {
        navigation.goBack();
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
        onPress={handlePress}
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
      />
    </AppScreen>
  );
}
