import { Alert, Heading, Text, VStack } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { uiTheme } from "../utils/uiTheme";

export default function WelcomeMessage({ message }) {
  return (
    <VStack alignItems={"center"} space={3}>
      <Heading textAlign={"center"} fontSize={"xl"}>{message.title}</Heading>
      <MaterialCommunityIcons
        name={message.iconName}
        size={100}
        color={uiTheme.colors.welcomeIcon.base}
      />
      <Alert borderWidth={1} padding={2}>
        <Text fontSize={"md"}>{message.text}</Text>
      </Alert>
    </VStack>
  );
}
