import {
  Button,
  Heading,
  Text,
  Flex,
  VStack,
  Box,
  HStack,
  Icon,
} from "native-base";
import IntentionsList from "../../components/IntentionsList";
import { notificationsController } from "../../controllers/NotificationsController";
import { observer } from "mobx-react";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import ButtonGroup from "native-base/src/components/primitives/Button/ButtonGroup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { materialIconsNames } from "../../utils/constants";
import { triggersController } from "../../controllers/TriggersController";

function HabitPage({ navigation, route }) {
  const habit = route.params.habit;
  const intentions = habit.intentions;
  const trigger = triggersController.getTriggerById(habit.triggerEventID);
  return (
    <Flex
      bg={"white"}
      padding={0}
      height={"100%"}
      justifyContent={"space-between"}
    >
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
              <Text fontSize={"xl"}>Linked trigger:</Text>
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
          Edit
        </Button>
        <Button
            variant={'outline'}
            size={'md'}
          onPress={() => {
            notificationsController.schedulePushNotification(
              habit.produceNotification(),
              { seconds: 2 },
              "habit " + habit.habitID
            );
          }}
        >
          Send test notification
        </Button>
      </VStack>
    </Flex>
  );
}

export default observer(HabitPage);
