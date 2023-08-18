import { StyleSheet } from "react-native";
import { Fab, Flex, Icon, ScrollView, Stack, Text } from "native-base";
import HabitListItem from "../../components/HabitListItem";
import { habitsController } from "../../controllers/HabitsController";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";

function HabitsScreen({ navigation, isFocused }) {
  // console.log(habitsController.habits);
  return (
    <>
      <Fab
        renderInPortal={false}
        marginBottom={0}
        placement="bottom-right"
        colorScheme="blue"
        size="lg"
        icon={<Icon name="add" as={Ionicons} />}
        onPress={() => {
          navigation.navigate("ManageHabit");
        }}
      />
      <Flex height={"100%"} bg={"white"}>
        <Stack direction="column" padding={1}>
          {/* https://docs.nativebase.io/fab */}
          <ScrollView>
            {habitsController.habits !== null ? (
              habitsController.habits.map((habit) => (
                <HabitListItem habit={habit} key={habit.habitID} />
              ))
            ) : (
              <Text>Loading...</Text>
            )}
          </ScrollView>
        </Stack>
      </Flex>
    </>
  );
}

export default observer(HabitsScreen);
