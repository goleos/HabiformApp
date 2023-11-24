import { Button, Fab, Icon, ScrollView, VStack } from "native-base";
import { habitsController } from "../../controllers/HabitsController";
import Ionicons from "react-native-vector-icons/Ionicons";
import { observer } from "mobx-react";
import HabitList from "../../components/HabitList";
import { useEffect, useState } from "react";
import HabitStatus from "../../models/habitStatus";
import { i18n } from "../../utils/localisation";
import AppScreen from "../../components/AppScreen";
import FilterSelector from "../../components/navheader/FilterSelector";
import HeaderIconButton from "../../components/navheader/HeaderIconButton";

function HabitsScreen({ navigation, isFocused }) {
  const [filterValue, setFilterValue] = useState(HabitStatus.Active);
  const habits = habitsController.habits.filter((habit) => {
    return habit.habitStatus === filterValue;
  });

  const handleCreateHabit = () => {
    navigation.navigate("ManageHabit", {
      habit: null,
    });
  };

  const habitsFilterLeftButton = (
    <FilterSelector
      initialFilter={{
        value: HabitStatus.Active,
        displayValue: i18n.t("habitStateActive"),
      }}
      onFilterChange={(filterValue) => {
        setFilterValue(filterValue.value)
      }}
      _button={{
          mt: -1,
          ml: -2
      }}
    >
      <FilterSelector.FilterSelectorItem
        value={{
          value: HabitStatus.Draft,
          displayValue: i18n.t("habitStateDraft"),
        }}
        materialIconName={"pencil-circle-outline"}
      />
      <FilterSelector.FilterSelectorItem
        value={{
          value: HabitStatus.Active,
          displayValue: i18n.t("habitStateActive"),
        }}
        materialIconName={"gauge"}
      />
      <FilterSelector.FilterSelectorItem
        value={{
          value: HabitStatus.Archived,
          displayValue: i18n.t("habitStateArchived"),
        }}
        materialIconName={"archive-outline"}
      />
    </FilterSelector>
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => habitsFilterLeftButton,
        headerRight: () => (
            <HeaderIconButton
                materialIconName={"plus-circle"}
                onPress={handleCreateHabit}
                mr={-2}
                mt={-1}
            />
        ),
    });
  }, []);

  return (
    <AppScreen>
      <VStack space={2} flex={1}>
        <ScrollView>
          <HabitList
            habits={habits}
            onItemPress={(habit) => {
              navigation.navigate("HabitPage", {
                habit: habit,
              });
            }}
          />
        </ScrollView>
      </VStack>
      {/* https://docs.nativebase.io/fab */}
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        colorScheme="blue"
        size="lg"
        icon={<Icon name="add" as={Ionicons} />}
        onPress={handleCreateHabit}
      />
    </AppScreen>
  );
}

export default observer(HabitsScreen);
