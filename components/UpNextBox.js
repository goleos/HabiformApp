import {
  Box,
  Divider,
  Heading,
  HStack,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import TriggerListItem from "./TriggerListItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HabitList from "./HabitList";
import { useState } from "react";
import IntentionsList from "./IntentionsList";

export default function UpNextBox({ trigger, habits }) {
  const hasHabits = habits.length >= 1;
  const [selectedHabit, setSelectedHabit] = useState(
    hasHabits ? habits[0] : null
  );

  return (
    <Box borderWidth={2} borderRadius={10} padding={2}>
      <HStack
        id="triggerInfo"
        justifyContent={"center"}
        alignItems={"center"}
        space={2}
      >
        <MaterialCommunityIcons name={"clock-outline"} size={50} />
        <VStack space={0}>
          <Text>{trigger.name}</Text>
          <Text highlight fontSize={"lg"}>
            {trigger.timeIntervalStart + " — " + trigger.timeIntervalEnd}
          </Text>
        </VStack>
      </HStack>
      <Divider my={2} />
      <Heading>Habits</Heading>
      {hasHabits && (
          <VStack space={1} padding={2}>

        <Select
          selectedValue={selectedHabit}
          onValueChange={(itemValue) => {
            setSelectedHabit(itemValue);
          }}
        >
          {habits.map((habit) => (
            <Select.Item label={habit.name} value={habit} key={habit.habitID} />
          ))}
        </Select>
            <IntentionsList intentions={selectedHabit.intentions} readOnly={true} />
          </VStack>
      )}
    </Box>
  );
}
