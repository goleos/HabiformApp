import { SafeAreaView, Switch } from "react-native";
import {
  AlertDialog,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "native-base";
import { appSettingsController } from "../controllers/AppSettingsController";
import { observer } from "mobx-react";
import BoxStack from "../components/boxes/BoxStack";
import InfoAlert from "../components/InfoAlert";
import { dbController } from "../controllers/DatabaseController";
import { habitsController } from "../controllers/HabitsController";
import { triggersController } from "../controllers/TriggersController";
import { useRef, useState } from "react";

function SettingsScreen() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const emptyRef = useRef(null);
  return (
    <SafeAreaView>
      <Flex
        bg={"white"}
        height={"100%"}
        padding={2}
        justifyContent={"space-between"}
      >
        <VStack space={4}>
          <BoxStack title={"Notification settings"}>
            <InfoAlert
              text={
                "Turning this setting off means that you will not receive any information about implementation intentions, when you are reminded about a habit"
              }
            />
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
            <HStack paddingRight={1} justifyContent={'space-between'} alignItems={"center"} space={3}>
              <Text fontSize={"md"}>Ask to stop reminders after</Text>
              <Input
                keyboardType={"numeric"}
                value={
                  appSettingsController.daysBeforeRequestCancelNotification.toString()
                }
                onChangeText={(val) => {
                  console.log('changing')
                  parseInt(appSettingsController.setDaysBeforeRequestCancelNotification(val));
                }}
                width={20}
                backgroundColor={'primary.50'}
              />
              <Text>days</Text>
            </HStack>
          </BoxStack>
          <BoxStack title={"Data management"}>
            <Button
              colorScheme={"delete"}
              onPress={() => {
                dbController.deleteEverything();
                habitsController.requestHabits();
                triggersController.requestTriggers();
              }}
            >
              Delete all data
            </Button>
          </BoxStack>
          <BoxStack>
            <HStack paddingY={2} justifyContent={"space-between"}>
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
