import { observer } from "mobx-react";
import { SafeAreaView } from "react-native";
import { Alert, Box, Button, Flex, Heading, Text, VStack } from "native-base";
import { appSettingsController } from "../../controllers/AppSettingsController";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import WelcomeMessage from "../../components/WelcomeMessage";
import { welcomeMessages } from "../../constants";
import { useState } from "react";

function WelcomeScreen({ navigation }) {
  const [slideNumber, setSlideNumber] = useState(1);
  const selectedMessage = welcomeMessages.find((message) => {
    return message.number === slideNumber;
  });

  const lastSlideFinishComponent = <VStack space={1}>
      <Text>Would you like to start with example habits and triggers so you can better understand how the app works?</Text>
      <Button
          onPress={() => {
              navigation.navigate("App");
          }}
      >
          Start with example data
      </Button>
      <Button
          onPress={() => {
              navigation.navigate("App");
          }}
      >
          Start with empty data
      </Button>
  </VStack>

  return (
    <SafeAreaView>
      <Flex
        height={"100%"}
        bg={"white"}
        padding={2}
        justifyContent={"space-between"}
      >
        <Heading alignSelf={"center"}>Welcome!</Heading>
        <WelcomeMessage message={selectedMessage} />

        {selectedMessage.isLastSlide ? (
          lastSlideFinishComponent
        ) : (
          <Button
            onPress={() => {
              setSlideNumber(slideNumber + 1);
            }}
          >
            Continue
          </Button>
        )}
      </Flex>
    </SafeAreaView>
  );
}

export default WelcomeScreen;
