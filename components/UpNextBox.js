import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import TriggerListItem from "./listItems/TriggerListItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HabitList from "./HabitList";
import { useState } from "react";
import IntentionsList from "./IntentionsList";
import { materialIconsNames } from "../utils/constants";

export default function UpNextBox({ trigger, habits }) {
  const hasHabits = habits.length >= 1;

  const noHabitsComponent = (
    <Text>No habits are associated with this trigger</Text>
  );

  const HabitsPresentComponent = ({habits}) => {
    const [selectedHabit, setSelectedHabit] = useState(
        habits[0]
    );
    return (
        <VStack space={1} padding={2}>
          <Select
              selectedValue={selectedHabit}
              onValueChange={(itemValue) => {
                setSelectedHabit(itemValue);
              }}
          >
            {habits.map((habit) => (
                <Select.Item
                    label={habit.name}
                    value={habit}
                    key={habit.habitID}
                />
            ))}
          </Select>
          <IntentionsList
              intentions={selectedHabit.intentions}
              readOnly={true}
          />
        </VStack>
    )
  }

  return (
    <Box borderWidth={2} borderRadius={10} padding={2}>
      <HStack
        id="triggerInfo"
        justifyContent={"center"}
        alignItems={"center"}
        space={2}
      >
        <Icon
          as={MaterialCommunityIcons}
          name={materialIconsNames.trigger}
          size={50}
          color={"primary.500"}
        />
        <VStack space={0}>
          <Text>{trigger.name}</Text>
          <Text fontSize={"lg"}>
            {trigger.timeIntervalStart + " — " + trigger.timeIntervalEnd}
          </Text>
        </VStack>
      </HStack>
      <Divider my={2} />
      {/*<Heading fontSize={'xl'}>Habits</Heading>*/}
      {hasHabits ? <HabitsPresentComponent habits={habits} /> : noHabitsComponent}
    </Box>
  );
}
