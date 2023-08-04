
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
                <Stack alignItems="center" justifyContent="center" direction="row" space={1}>
                    <Text fontSize="xl">{habit.name}</Text>
                    <Icon as={Ionicons} name={habit.shouldNotify ? "notifications" : 'notifications-off'} size={4} color="blue.700" />
                </Stack>

                {badge}
                <Stack direction="row" alignItems="center" space={1}>
                    <Icon as={Ionicons} name="time" size={3} color="blue.700" />
                    <Text fontSize="xs" color="coolGray.500">
                        Finishing dinner
                    </Text>
                </Stack>
            </Stack>
        </ContentBox>
    )}