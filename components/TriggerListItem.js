// https://docs.nativebase.io/stack
// https://docs.nativebase.io/icon#h3-integration-with-third-party-icons

// import { Text } from "react-native";
import {Text} from 'native-base'
import { NativeBaseProvider, Box, Stack, IconButton, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentBox from "./ContentBox";

export default function TriggerListItem({ trigger }) {
  return (
      <ContentBox>
        <Stack direction="column" alignItems="left">
          <Text fontSize="xl">{trigger.name}</Text>
          <Stack direction="row" alignItems="center" space={1} display={"flex"} flexDirection={"row"} justifyItems="space-between">
            <Icon as={Ionicons} name="time" size={3} color="blue.700" />
            <Text fontSize="xs" color="coolGray.500">
              {trigger.timeIntervalStart} - {trigger.timeIntervalEnd}
            </Text>
          </Stack>
        </Stack>
      </ContentBox>
  );
}
