import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Flex, Heading, HStack, Text } from "native-base";
import { Switch } from "react-native";
import { habitsController } from "../controllers/HabitsController";
import { appSettingsController } from "../controllers/AppSettingsController";
import { observer } from "mobx-react";
import Habit from "../models/habit";

function SettingsScreen() {
  return (
    <SafeAreaView>
      <Flex bg={"white"} height={"100%"} padding={2}>
        <Heading mb={3}>Settings Screen</Heading>
        <HStack justifyContent={"space-between"} alignItems={'center'}>
          <Text fontSize={'md'}>Remind with habit intentions</Text>
          <Switch
            value={appSettingsController.shouldRemindWithIntentions}
            onValueChange={(val) => {
                appSettingsController.setShouldRemindWithIntentions(val)
            }}
          />
        </HStack>
      </Flex>
    </SafeAreaView>
  );
}

export default observer(SettingsScreen);
