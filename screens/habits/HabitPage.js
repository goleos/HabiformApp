import { Box, Button, Flex, HStack, Icon, Text, VStack } from "native-base";
import IntentionsList from "../../components/IntentionsList";
import { notificationsController } from "../../controllers/NotificationsController";
import { observer } from "mobx-react";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { materialIconsNames } from "../../utils/constants";
import { triggersController } from "../../controllers/TriggersController";
import {i18n} from "../../utils/localisation";
import AppScreen from "../../components/AppScreen";

function HabitPage({ navigation, route }) {
  const habit = route.params.habit;
  const intentions = habit.intentions;
  const trigger = triggersController.getTriggerById(habit.triggerEventID);
  return (
      <AppScreen>
      <VStack space={8}>
        <HeadingWithIcon
          headingText={habit.name}
          bodyText={habit.extraNotes}
          iconName={"repeat"}
        />

        {trigger !== undefined && (
          <Box
            padding={2}
            borderRadius={10}
            backgroundColor={"blue.200"}
            alignSelf={"center"}
          >
            <HStack space={2} alignItems={"center"}>
              <Icon
                as={MaterialCommunityIcons}
                name={materialIconsNames.trigger}
                size={5}
                color={"primary.500"}
              />
              <Text fontSize={"xl"}>{i18n.t("linkedTrigger")}:</Text>
              <Text fontSize={"xl"}>{trigger.name}</Text>
            </HStack>
          </Box>
        )}

        <IntentionsList
          includeTitle={true}
          intentions={intentions}
          readOnly={true}
        />
      </VStack>

      <VStack space={1} padding={3}>
        <Button
          onPress={() => {
            navigation.navigate("ManageHabit", {
              habit: habit,
            });
          }}
        >
          {i18n.t("edit")}
        </Button>
        <Button
          variant={"outline"}
          size={"md"}
          onPress={() => {
            notificationsController.schedulePushNotification(
              habit.produceNotification(),
              { seconds: 2 },
              "habit " + habit.habitID
            );
          }}
        >
          {i18n.t("sendTestNotification")}
        </Button>
      </VStack>
      </AppScreen>
  );
}

export default observer(HabitPage);
