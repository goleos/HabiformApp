import { SafeAreaView, Switch } from "react-native";
import { Button, Flex, Heading, HStack, Text } from "native-base";
import { appSettingsController } from "../controllers/AppSettingsController";
import { observer } from "mobx-react";

function SettingsScreen() {
  return (
    <SafeAreaView>
      <Flex bg={"white"} height={"100%"} padding={2}>
        <Heading mb={3}>Settings Screen</Heading>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"md"}>Remind with habit intentions</Text>
          <Switch
            value={appSettingsController.shouldRemindWithIntentions}
            onValueChange={(val) => {
              appSettingsController.setShouldRemindWithIntentions(val);
            }}
          />
        </HStack>
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
