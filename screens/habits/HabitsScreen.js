import { Button, Fab, Icon, ScrollView, VStack } from "native-base";
import { habitsController } from "../../controllers/HabitsController";
import Ionicons from "react-native-vector-icons/Ionicons";
import { observer } from "mobx-react";
import HabitList from "../../components/HabitList";
import { useState } from "react";
import HabitStatus from "../../models/habitStatus";
import {i18n} from "../../utils/localisation";

function HabitsScreen({ navigation, isFocused }) {
  // console.log(habitsController.habits);
  const [filterValue, setFilterValue] = useState(HabitStatus.Active);
  const habits = habitsController.habits.filter((habit) => {
    return habit.habitStatus === filterValue;
  });
  return (
    <>
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

      <VStack space={2} backgroundColor={"white"} flex={1}>
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
    </>
  );
}

export default observer(HabitsScreen);
