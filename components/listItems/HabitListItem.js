import { Text } from "native-base";
import {
  NativeBaseProvider,
  Box,
  Stack,
  IconButton,
  Icon,
  Flex,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentBox from "../ContentBox";
import { Badge } from "native-base";
import { triggersController } from "../../controllers/TriggersController";
import IconWithText from "../IconWithText";
import { materialIconsNames } from "../../utils/constants";
import {i18n} from "../../utils/localisation";

export default function HabitListItem({ habit, hideArrowButton, onPress }) {
  let badge;
  if (!habit.isFormed) {
    badge = <></>;
    // badge = (
    //   <Badge variant="solid" borderRadius={10} colorScheme="info">
    //     Building
    //   </Badge>
    // );
  } else {
    badge = (
      <Badge variant="solid" borderRadius={10} colorScheme="success">
        {i18n.t("formed")}
      </Badge>
    );
  }
  const trigger = triggersController.getTriggerById(habit.triggerEventID);
  const notifyCondition =
    habit.shouldNotify &&
    trigger !== undefined &&
    trigger.timeIntervalStart !== null;

  return (
    <ContentBox hideArrowButton={hideArrowButton} onPress={onPress}>
      <Stack direction="column" alignItems="left" space={2}>
        <Text maxWidth={260} fontSize="xl">
          <Text>{habit.name} </Text>
          <Icon
            as={Ionicons}
            name={notifyCondition ? "notifications" : "notifications-off"}
            size={4}
            color={notifyCondition ? "green.600" : "red.600"}
          />
        </Text>
        {badge}

        {habit.triggerEventID !== null && trigger !== undefined && (
          <IconWithText
            iconName={materialIconsNames.trigger}
            text={trigger.name}
          />
        )}
        <IconWithText
          iconName={"play"}
          text={
            habit.intentions.length >= 1
              ? habit.intentions[0]
              : i18n.t("noIntentionsProvided")
          }
        />
      </Stack>
    </ContentBox>
  );
}
