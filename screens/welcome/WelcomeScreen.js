import {observer} from "mobx-react";
import {SafeAreaView} from "react-native";
import {Button, Flex, Heading, Text, VStack} from "native-base";
import {appSettingsController} from "../../controllers/AppSettingsController";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function WelcomeScreen({navigation}) {
    return (
        <SafeAreaView>
            <Flex height={'100%'} bg={'white'} padding={2} justifyContent={'space-between'}>
            <Heading alignSelf={'center'}>Welcome!</Heading>
                <VStack alignItems={'center'}>
                    <MaterialCommunityIcons name={'emoticon-excited'} size={100} color={'blue'} />
                    <Text fontSize={'xl'}>Thank you for downloading this app!</Text>
                </VStack>

            <Button onPress={() => {
                navigation.navigate('App')
            }}>Dismiss</Button>
            </Flex>
        </SafeAreaView>
    )
}

export default observer(WelcomeScreen)