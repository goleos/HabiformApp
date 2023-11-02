import { Box, Icon, Stack } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ContentBox(props) {
  return (
    <Box
      backgroundColor="white"
      borderRadius={15}
      paddingLeft={3}
      paddingY={3}
      margin={2}
      shadow={6}
    >
      <Stack
        direction="row"
        alignItems="center"
        space={5}
        justifyContent="space-between"
      >
        {props.children}
        {props.hideArrowButton !== true && (
          <Icon
            margin={3}
            size={19}
            as={Ionicons}
            name="chevron-forward-outline"
          />
        )}
      </Stack>
    </Box>
  );
}
