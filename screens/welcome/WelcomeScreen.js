import { SafeAreaView } from "react-native";
import { Button, Flex, Heading, Text, VStack } from "native-base";
import { appSettingsController } from "../../controllers/AppSettingsController";
import WelcomeMessage from "../../components/WelcomeMessage";
import { welcomeMessages } from "../../constants";
import { useState } from "react";
import { sampleHabits, sampleTriggers } from "../../assets/sample_data";
import { triggersController } from "../../controllers/TriggersController";
import Habit from "../../models/habit";
import { habitsController } from "../../controllers/HabitsController";
import Trigger from "../../models/trigger";

function WelcomeScreen({ navigation }) {
  const [slideNumber, setSlideNumber] = useState(1);
  const selectedMessage = welcomeMessages.find((message) => {
    return message.number === slideNumber;
  });

  const loadSampleData = () => {
    sampleTriggers.forEach((triggerObj) => {
      console.log(triggerObj);
      const trigger = new Trigger(triggerObj);
      triggersController.createNewTrigger(
        trigger,
        () => {
          console.log("succc");
        },
        () => {
          console.log("faillll");
        }
      );
    });
    sampleHabits.forEach((habitObj) => {
      const habit = new Habit(
        habitObj,
        () => {
          console.log("succc");
        },
        () => {
          console.log("failll");
        }
      );
      habitsController.createNewHabit(
        habit,
        () => {},
        () => {}
      );
    });
  };

  const lastSlideFinishComponent = (
    <VStack space={1}>
      <Text>
        Would you like to start with example habits and triggers so you can
        better understand how the app works?
      </Text>
      <Button
        onPress={async () => {
          await appSettingsController.setShowIntroScreen(false);
          loadSampleData();
          navigation.navigate("App");
        }}
      >
        Start with example data
      </Button>
      <Button
          variant={'outline'}
        colorScheme={"secondary"}
        onPress={async () => {
          await appSettingsController.setShowIntroScreen(false);
          navigation.navigate("App");
        }}
      >
        Start with empty data
      </Button>
    </VStack>
  );

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
