import { SafeAreaView, Switch } from "react-native";
import {Button, Flex, Heading, HStack, Text, VStack} from "native-base";
import { appSettingsController } from "../controllers/AppSettingsController";
import { observer } from "mobx-react";
import BoxStack from "../components/boxes/BoxStack";

function SettingsScreen() {
  return (
    <SafeAreaView>
      <Flex bg={"white"} height={"100%"} padding={2}>
          <Heading mb={3}>Settings Screen</Heading>
          <VStack space={4}>

          <BoxStack>

        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"md"}>Remind with habit intentions</Text>
          <Switch
            value={appSettingsController.shouldRemindWithIntentions}
            onValueChange={(val) => {
              appSettingsController.setShouldRemindWithIntentions(val);
            }}
          />
        </HStack>
          </BoxStack>
        <Button
          onPress={async () => {
            await appSettingsController.resetSettings();
          }}
        >
          Reset settings
        </Button>
          </VStack>

      </Flex>
    </SafeAreaView>
  );
}

export default observer(SettingsScreen);
