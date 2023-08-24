import {Button, HStack, Icon, IconButton, Stack, VStack} from "native-base";
import IntentionListItem from "./IntentionListItem";
import BasicBox from "./boxes/BasicBox";
import BoxStack from "./boxes/BoxStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function IntentionsList({ intentions, onChange, readOnly, includeTitle }) {
  return (
      <BoxStack title={includeTitle === true ? 'Implementation intentions' : undefined}>
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
      {!readOnly && (
        <HStack justifyContent={"center"} space={3}>
          <IconButton
              icon={<Icon as={MaterialCommunityIcons} name={'minus-box'} size={30} /> }
            onPress={() => {
              let newArray = [...intentions];
              newArray.pop();
              onChange(newArray);
            }}
          >
            Remove
          </IconButton>
          <IconButton
              icon={<Icon as={MaterialCommunityIcons} name={'plus-box'} size={30} />}
            onPress={() => {
              onChange([...intentions, ""]);
            }}
          >
            Add intention
          </IconButton>
        </HStack>
      )}
    </VStack>
      </BoxStack>
  );
}
