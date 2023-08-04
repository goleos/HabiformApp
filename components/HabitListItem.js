
import {Text} from 'native-base'
import { NativeBaseProvider, Box, Stack, IconButton, Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContentBox from "./ContentBox";
import { Badge } from 'native-base';

export default function HabitListItem({ habit }) {
    let badge;
    if (!habit.isFormed) {
        badge = <Badge variant="solid" borderRadius={10} colorScheme="info">Building</Badge>
    } else {
        badge = <Badge variant="solid" borderRadius={10} colorScheme="success">Formed</Badge>
    }
    return (
        <ContentBox>
            <Stack direction="column" alignItems="left">
                <Text fontSize="xl">{habit.name}</Text>
                {badge}
            </Stack>
        </ContentBox>
    )}