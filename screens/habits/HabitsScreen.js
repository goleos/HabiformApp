import {Button, Fab, Flex, Icon, ScrollView, Text, VStack} from "native-base";
import { habitsController } from "../../controllers/HabitsController";
import Ionicons from "react-native-vector-icons/Ionicons";
import { observer } from "mobx-react";
import HabitList from "../../components/HabitList";
import ContentBox from "../../components/ContentBox";
import {useState} from "react";
import HabitStatus from "../../models/habitStatus";

function HabitsScreen({ navigation, isFocused }) {
  // console.log(habitsController.habits);
    const [filterValue, setFilterValue] = useState(HabitStatus.Active)
    const habits = habitsController.habits.filter((habit) => {
        return habit.habitStatus === filterValue
    })
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
            <VStack space={2}>
        <Button.Group mt={3} alignSelf={'center'} isAttached colorScheme={'secondary'} size={'md'}>
            <Button variant={filterValue !== HabitStatus.Draft ? 'outline' : 'solid'} onPress={() => {
                setFilterValue(HabitStatus.Draft)
            }}>Draft</Button>
            <Button variant={filterValue !== HabitStatus.Active ? 'outline' : 'solid'} onPress={() => {
                setFilterValue(HabitStatus.Active)
            }} >Active</Button>
            <Button variant={filterValue !== HabitStatus.Archived ? 'outline' : 'solid'} onPress={() => {
                setFilterValue(HabitStatus.Archived)
            }}>Archived</Button>

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
    </Flex>
    </>
  );
}

export default observer(HabitsScreen);
