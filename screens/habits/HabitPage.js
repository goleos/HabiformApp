import {Button, Heading, Text, Flex, VStack} from "native-base";
import IntentionsList from "../../components/IntentionsList";
import {notificationsController} from "../../controllers/NotificationsController";
import {observer} from "mobx-react";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import ButtonGroup from "native-base/src/components/primitives/Button/ButtonGroup";

function HabitPage({navigation, route}) {
    const habit = route.params.habit;
    const intentions = habit.intentions;
    return (
        <Flex bg={'white'} padding={0} height={'100%'} justifyContent={'space-between'}>
            <HeadingWithIcon headingText={habit.name} bodyText={habit.extraNotes} iconName={'repeat'} />
            <IntentionsList includeTitle={true} intentions={intentions} readOnly={true}/>
            <VStack space={1}>

            <Button
                onPress={() => {
                    navigation.navigate("ManageHabit", {
                        habit: habit,
                    });
                }}
            >
                Edit
            </Button>
            <Button onPress={() => {
                notificationsController.schedulePushNotification(habit.produceNotification(), {seconds: 2}, 'habit ' + habit.habitID)
            }}>Notify</Button>
            </VStack>
            </Flex>
            );
            }

export default observer(HabitPage);
