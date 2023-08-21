import { Button, HStack, Stack, VStack } from "native-base";
import IntentionListItem from "./IntentionListItem";

export default function IntentionsList({ intentions, onChange, readOnly }) {
  return (
    <VStack space={3}>
      <VStack space={1}>
        {intentions.map((intention, index) => {
          return (
            <IntentionListItem
              intentionText={intention}
              isReadOnly={readOnly}
              key={index}
              intentionNumber={(index + 1).toString()}
              onChangeText={(newText) => {
                const intentionsArray = [...intentions];
                intentionsArray[index] = newText;
                onChange(intentionsArray);
              }}
            />
          );
        })}
      </VStack>
        {!readOnly && <HStack justifyContent={"center"} space={5}>
        <Button
          onPress={() => {
            let newArray = [...intentions];
            newArray.pop();
            onChange(newArray);
          }}
        >
          Remove
        </Button>
        <Button
          onPress={() => {
            onChange([...intentions, ""]);
          }}
        >
          Add intention
        </Button>
      </HStack>}
    </VStack>
  );
}
