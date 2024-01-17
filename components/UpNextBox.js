import {Box, Divider, Heading, HStack, Icon, Select, Text, VStack} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import IntentionsList from "./IntentionsList";
import { materialIconsNames } from "../utils/constants";
import {i18n} from "../utils/localisation";

export default function UpNextBox({ trigger, habits }) {
  const hasHabits = habits.length >= 1;

  const noHabitsComponent = (
    <Text>{i18n.t("noHabitsAssociated")}</Text>
  );

  const HabitsPresentComponent = ({ habits }) => {
    const [selectedHabit, setSelectedHabit] = useState(habits[0]);
    return (
      <VStack space={1.5} >
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
    );
  };

  return (
    <>
      <HStack
        id="triggerInfo"
        justifyContent={"center"}
        alignItems={"center"}
        space={2}
        paddingY={2}
        borderRadius={13}
        backgroundColor={'primary.50'}
        marginY={1}
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
      {/*<Divider my={2} />*/}
      {/*<Heading fontSize={'xl'}>Habits</Heading>*/}
      {hasHabits ? (
        <HabitsPresentComponent habits={habits} />
      ) : (
        noHabitsComponent
      )}
    </>
  );
}
