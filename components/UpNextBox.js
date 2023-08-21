import { Box, Heading, HStack, Text } from "native-base";
import TriggerListItem from "./TriggerListItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HabitList from "./HabitList";

export default function UpNextBox({ trigger, habits }) {
  return (
    <Box borderWidth={3} borderRadius={10} padding={2}>
      <HStack justifyContent={"center"} alignItems={"center"} space={2}>
        <MaterialCommunityIcons name={"clock-outline"} size={40} />
        <Text highlight fontSize={"2xl"}>
          {trigger.timeIntervalStart + "—" + trigger.timeIntervalEnd}
        </Text>
      </HStack>
      <TriggerListItem trigger={trigger} />
      <Heading>Habits</Heading>
      {habits !== [] ? (
        <HabitList habits={habits} />
      ) : (
        <Text>No habits are linked</Text>
      )}
    </Box>
  );
}
