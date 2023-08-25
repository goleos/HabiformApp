import {Icon, Stack, Text} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {materialIconsNames} from "../utils/constants";
import {triggersController} from "../controllers/TriggersController";

export default function IconWithText({iconName, text}) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            space={1}
            display={"flex"}
            flexDirection={"row"}
            justifyItems="space-between"
        >
            <Icon as={MaterialCommunityIcons} name={iconName} size={4} color="blue.700" />
            <Text fontSize="xs" color="coolGray.500">
                {text}
            </Text>
        </Stack>
    )
}