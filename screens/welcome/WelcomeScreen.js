import { Button, Flex, Text, View, VStack } from "native-base";
import { appSettingsController } from "../../controllers/AppSettingsController";
import WelcomeMessage from "../../components/WelcomeMessage";
import { welcomeMessages } from "../../utils/constants";
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
    <VStack space={5} margin={1}>
      <Text>
        Would you like to start with example habits and triggers so you can
        better understand how the app works?
      </Text>
      <VStack space={2}>
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
          variant={"outline"}
          colorScheme={"secondary"}
          onPress={async () => {
            await appSettingsController.setShowIntroScreen(false);
            navigation.navigate("App");
          }}
        >
          Start with empty data
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
            Continue
          </Button>
        )}
      </View>
    </Flex>
  );
}

export default WelcomeScreen;
