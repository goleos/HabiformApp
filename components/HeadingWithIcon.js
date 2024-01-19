import { Heading, Icon, Text, VStack, HStack } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BasicBox from "./boxes/BasicBox";

export default function HeadingWithIcon({ iconName, headingText, bodyText }) {
  return (
    <BasicBox >
        <HStack alignItems={"center"} space={1} >
      <Icon
        as={MaterialCommunityIcons}
        size={85}
        name={iconName}
        color={"primary.500"}
      />
          <Heading maxWidth={"70%"}>{headingText}</Heading>
        </HStack>
      {/*<Text>{"Trigger id:" + trigger.triggerEventID} </Text>*/}
      <VStack ml={3} space={1}>
          {bodyText !== "" && (
                  <Text>{bodyText}</Text>
          )}
      </VStack>
    </BasicBox>
  );
}
