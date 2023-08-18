import { Text } from "react-native";
import ManageHabitForm from "../../components/ManageHabitForm";
import { Flex } from "native-base";

export default function ManageHabitScreen({ navigation }) {
  return (
    <Flex height={"100%"} bg={"white"} padding={3}>
      <ManageHabitForm
        onCreateOrEdit={() => {
          navigation.goBack();
        }}
      />
    </Flex>
  );
}
