import { Text } from "react-native";
import ManageHabitForm from "../../components/ManageHabitForm";
import { Flex } from "native-base";

export default function ManageHabitScreen({ navigation, route }) {
  return (
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
  );
}
