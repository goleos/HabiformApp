import { Fab, Flex, Icon } from "native-base";
import { habitsController } from "../../controllers/HabitsController";
import Ionicons from "react-native-vector-icons/Ionicons";
import { observer } from "mobx-react";
import HabitList from "../../components/HabitList";

function HabitsScreen({ navigation, isFocused }) {
  // console.log(habitsController.habits);
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
      <Flex height={"100%"} bg={"white"}>
        <HabitList
          habits={habitsController.habits}
          onItemPress={(habit) => {
            navigation.navigate("HabitPage", {
              habit: habit,
            });
          }}
        />
      </Flex>
    </>
  );
}

export default observer(HabitsScreen);
