import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { Flex } from "native-base";
import ManageTriggerForm from "../../components/ManageTriggerForm";
import { focusedTriggerController } from "../../controllers/FocusedTriggerController";

export default function ManageTriggerScreen({ navigation }) {
  return (
    // helped by this answer on stackoverflow: https://stackoverflow.com/a/34779467 [Accessed: 4 September]
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Flex height={"100%"} bg={"white"}>
        <ManageTriggerForm
          trigger={focusedTriggerController.trigger}
          onCreateOrEdit={() => {
            navigation.goBack();
          }}
          onDelete={() => {
            navigation.navigate("My Triggers");
          }}
        />
      </Flex>
    </TouchableWithoutFeedback>
  );
}
