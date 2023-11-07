import { Button, Flex, Text, View, VStack } from "native-base";
import { appSettingsController } from "../../controllers/AppSettingsController";
import WelcomeMessage from "../../components/WelcomeMessage";
import { welcomeMessages } from "../../utils/constants";
import { useState } from "react";
import {
  sampleHabitsEnglish,
  sampleTriggersEnglish,
  sampleHabitsRussian,
  sampleTriggersRussian,
} from "../../assets/sample_data";
import { triggersController } from "../../controllers/TriggersController";
import Habit from "../../models/habit";
import { habitsController } from "../../controllers/HabitsController";
import Trigger from "../../models/trigger";
import { i18n } from "../../utils/localisation";
import { getLocales } from "expo-localization";



function WelcomeScreen({ navigation }) {
  const [slideNumber, setSlideNumber] = useState(1);
  const selectedMessage = welcomeMessages.find((message) => {
    return message.number === slideNumber;
  });

  const handleCreateSampleHabits = async () => {
    await appSettingsController.setShowIntroScreen(false);
    const deviceLanguage = getLocales()[0].languageCode;
    habitsController.createSampleHabits(deviceLanguage)
    navigation.navigate("App");
  };



  const lastSlideFinishComponent = (
    <VStack space={5} margin={1}>
      <Text>{i18n.t("startWithSamplesMessage")}</Text>
      <VStack space={2}>
        <Button onPress={handleCreateSampleHabits}>
          {i18n.t("startWithExampleData")}
        </Button>
        <Button
          variant={"outline"}
          colorScheme={"secondary"}
          onPress={async () => {
            await appSettingsController.setShowIntroScreen(false);
            navigation.navigate("App");
          }}
        >
          {i18n.t("startWithEmptyData")}
        </Button>
      </VStack>
    </VStack>
  );

  return (
    <Flex height={"100%"} bg={"white"} padding={2}>
      {/*<Heading alignSelf={"center"}>Welcome!</Heading>*/}
      <View style={{ marginTop: 100 }}>
        <WelcomeMessage message={selectedMessage} />
      </View>

      <View style={{ position: "absolute", left: 10, right: 10, bottom: 40 }}>
        {selectedMessage.isLastSlide ? (
          lastSlideFinishComponent
        ) : (
          <Button
            onPress={() => {
              setSlideNumber(slideNumber + 1);
            }}
          >
            {i18n.t("continueButtonText")}
          </Button>
        )}
      </View>
    </Flex>
  );
}

export default WelcomeScreen;
