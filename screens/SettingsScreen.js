import { SafeAreaView, Switch } from "react-native";
import { Button, Flex, Heading, HStack, Text, VStack } from "native-base";
import { appSettingsController } from "../controllers/AppSettingsController";
import { observer } from "mobx-react";
import BoxStack from "../components/boxes/BoxStack";
import InfoAlert from "../components/InfoAlert";

function SettingsScreen() {
  return (
    <SafeAreaView>
      <Flex bg={"white"} height={"100%"} padding={2} justifyContent={'space-between'}>
        <VStack space={4}>
          <BoxStack>
            <InfoAlert text={'Turning this setting off means that you will not receive any information about implementation intentions, when you are reminded about a habit'} />
            <HStack justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={"md"}>Remind with habit intentions</Text>
              <Switch
                trackColor={{ true: "#2061c8" }}
                value={appSettingsController.shouldRemindWithIntentions}
                onValueChange={(val) => {
                  appSettingsController.setShouldRemindWithIntentions(val);
                }}
              />
            </HStack>
          </BoxStack>
          <BoxStack>
            <HStack paddingY={2} justifyContent={'space-between'}>
              <Text>App version</Text>
              <Text mr={3}>0.0.1</Text>
            </HStack>
          </BoxStack>
        </VStack>
          <Button
            onPress={async () => {
              await appSettingsController.resetSettings();
            }}
          >
            Reset settings
          </Button>

      </Flex>
    </SafeAreaView>
  );
}

export default observer(SettingsScreen);
