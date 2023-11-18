// https://docs.nativebase.io/stack
// https://docs.nativebase.io/icon#h3-integration-with-third-party-icons

import { Text } from "native-base";
import { NativeBaseProvider, Box, Stack, IconButton, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentBox from "../ContentBox";
import IconWithText from "../IconWithText";

export default function TriggerListItem({ trigger, onPress }) {
  return (
    <ContentBox onPress={onPress}>
      <Stack direction="column" alignItems="left" space={1.5}>
        <Text fontSize="xl">{trigger.name}</Text>
        {trigger.timeIntervalStart ? (
          <IconWithText
            iconName={"clock-time-eight"}
            text={trigger.timeIntervalStart + "—" + trigger.timeIntervalEnd}
          />
        ) : (
          <IconWithText iconName={"alert"} text={"times not provided"} />
        )}
      </Stack>
    </ContentBox>
  );
}
