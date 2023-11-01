import { Text } from "native-base";
import { NativeBaseProvider, Box, Stack, IconButton, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentBox from "../ContentBox";
import { Badge } from "native-base";
import { triggersController } from "../../controllers/TriggersController";
import IconWithText from "../IconWithText";
import { materialIconsNames } from "../../utils/constants";

export default function HabitListItem({ habit, hideArrowButton }) {
  let badge;
  if (!habit.isFormed) {
    badge = (<></>);
    // badge = (
    //   <Badge variant="solid" borderRadius={10} colorScheme="info">
    //     Building
    //   </Badge>
    // );
  } else {
    badge = (
      <Badge variant="solid" borderRadius={10} colorScheme="success">
        Formed
      </Badge>
    );
  }
  const trigger = triggersController.getTriggerById(habit.triggerEventID);
  const notifyCondition = (habit.shouldNotify && trigger !== undefined && trigger.timeIntervalStart !== null)

  return (
    <ContentBox hideArrowButton={hideArrowButton}>
      <Stack direction="column" alignItems="left" space={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          direction="row"
          space={1}
        >
          <Text maxWidth={200} fontSize="xl">{habit.name}</Text>
          <Icon
            as={Ionicons}
            name={notifyCondition ? "notifications" : "notifications-off"}
            size={4}
            color={notifyCondition ? "green.600" : 'red.600'}
          />
          {badge}
        </Stack>



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
              : "No intentions provided"
          }
        />
      </Stack>
    </ContentBox>
  );
}
