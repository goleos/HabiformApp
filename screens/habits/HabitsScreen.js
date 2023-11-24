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

function HabitsScreen({ navigation, isFocused }) {
  const [filterValue, setFilterValue] = useState(HabitStatus.Active);
  const habits = habitsController.habits.filter((habit) => {
    return habit.habitStatus === filterValue;
  });

  const habitsFilterRightButton = (
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
      headerLeft: () => habitsFilterRightButton,
    });
  }, []);

  return (
    <AppScreen>
      <VStack space={2} flex={1}>
        <Button.Group
          mt={3}
          alignSelf={"center"}
          isAttached
          colorScheme={"secondary"}
          size={"md"}
        >
          <Button
            variant={filterValue !== HabitStatus.Draft ? "outline" : "solid"}
            onPress={() => {
              setFilterValue(HabitStatus.Draft);
            }}
          >
            {i18n.t("habitStateDraft")}
          </Button>
          <Button
            variant={filterValue !== HabitStatus.Active ? "outline" : "solid"}
            onPress={() => {
              setFilterValue(HabitStatus.Active);
            }}
          >
            {i18n.t("habitStateActive")}
          </Button>
          <Button
            variant={filterValue !== HabitStatus.Archived ? "outline" : "solid"}
            onPress={() => {
              setFilterValue(HabitStatus.Archived);
            }}
          >
            {i18n.t("habitStateArchived")}
          </Button>
        </Button.Group>
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
        onPress={() => {
          navigation.navigate("ManageHabit", {
            habit: null,
          });
        }}
      />
    </AppScreen>
  );
}

export default observer(HabitsScreen);
