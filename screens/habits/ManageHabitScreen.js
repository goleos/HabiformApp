import { Keyboard, TouchableWithoutFeedback } from "react-native";
import ManageHabitForm from "../../components/ManageHabitForm";
import { Flex } from "native-base";

export default function ManageHabitScreen({ navigation, route }) {
  return (
    // helped by this answer on stackoverflow: https://stackoverflow.com/a/34779467 [Accessed: 4 September]
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Flex height={"100%"} bg={"white"} padding={2}>
        <ManageHabitForm
          habit={route.params.habit}
          onCreateOrEdit={() => {
            navigation.goBack();
          }}
          onDelete={() => {
            navigation.navigate("My Habits");
          }}
        />
      </Flex>
    </TouchableWithoutFeedback>
  );
}
