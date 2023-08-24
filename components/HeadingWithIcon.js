import { Box, Heading, Icon, Text, VStack } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BasicBox from "./boxes/BasicBox";

export default function HeadingWithIcon({ iconName, headingText, bodyText }) {
  return (
    <VStack alignItems={"center"} space={0.5}>
      {/*<Text>{"Trigger id:" + trigger.triggerEventID} </Text>*/}
      <Icon
        as={MaterialCommunityIcons}
        size={100}
        name={iconName}
        color={"primary.500"}
      />
      <Heading>{headingText}</Heading>
      {bodyText !== "" && (
        <BasicBox>
          <Text>{bodyText}</Text>
        </BasicBox>
      )}
    </VStack>
  );
}
