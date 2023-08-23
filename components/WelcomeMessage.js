import {Alert, Heading, Text, VStack} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function WelcomeMessage({message}) {
    return (
        <VStack alignItems={'center'} space={3}>
            <Heading fontSize={'xl'}>{message.title}</Heading>
            <MaterialCommunityIcons name={message.iconName} size={100} color={'blue'} />
            <Alert borderWidth={1} padding={2}>
                <Text fontSize={'md'}>{message.text}</Text>
            </Alert>
        </VStack>
    )
}