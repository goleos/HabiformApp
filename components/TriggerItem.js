// https://docs.nativebase.io/stack

import {Text } from "react-native";
import {NativeBaseProvider, Box, Stack, IconButton, Icon} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TriggerItem({trigger}) {
  return (
    <NativeBaseProvider>
      <Box backgroundColor="blue.200" borderRadius={5} paddingLeft={3} paddingY={3} margin={2}>
        <Stack direction="row" alignItems="center" space={5}>
            <Text>{trigger.name}</Text>
            <IconButton icon={<Icon as={Ionicons} name="chevron-forward-outline"/>}/>
        </Stack>
      </Box>
    </NativeBaseProvider>
  );
}
