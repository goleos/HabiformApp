import {
    Box,
    Heading,
    HStack,
    Icon,
    IconButton,
    ScrollView, Text,
    VStack,
} from "native-base";
import IntentionListItem from "./listItems/IntentionListItem";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { i18n } from "../utils/localisation";

export default function IntentionsList({
  intentions,
  onChange,
  readOnly,
  includeTitle,
  disableScroll,
    makeScrollable
}) {
  const adjustButtons = (
    <HStack justifyContent={"center"} space={3}>
      <IconButton
        icon={<Icon as={MaterialCommunityIcons} name={"minus-box"} size={30} />}
        onPress={() => {
          let newArray = [...intentions];
          newArray.pop();
          onChange(newArray);
        }}
      >
        Remove
      </IconButton>
      <IconButton
        icon={<Icon as={MaterialCommunityIcons} name={"plus-box"} size={30} />}
        onPress={() => {
          onChange([...intentions, ""]);
        }}
      >
        Add intention
      </IconButton>
    </HStack>
  );

  const oneIntentionItem = intentions.map((intention, index) => {
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
      })

  const intentionsList = (
    <VStack>
        {includeTitle === false ? <></> : <Heading fontSize={"lg"} alignSelf={"center"}>
        {i18n.t("implementationIntentionsHeader")}
      </Heading>}
        {makeScrollable ?         <ScrollView>
            {oneIntentionItem}
        </ScrollView> :
            oneIntentionItem
        }

    </VStack>
  );
  return (
    <Box bg={"gray.200"} padding={2} borderRadius={10}  >
      <VStack space={3} maxHeight={makeScrollable ? 200 : undefined}>
          {intentions.length === 0 ?
          <Text italic>There are no intentions provided for this habit</Text> :
          intentionsList}
      </VStack>
          {!readOnly && adjustButtons}
    </Box>
  );
}
