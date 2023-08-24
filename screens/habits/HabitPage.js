import {Button, Heading, Text, Flex} from "native-base";
import IntentionsList from "../../components/IntentionsList";
import {notificationsController} from "../../controllers/NotificationsController";
import {observer} from "mobx-react";
import HeadingWithIcon from "../../components/HeadingWithIcon";

function HabitPage({navigation, route}) {
    const habit = route.params.habit;
    const intentions = habit.intentions;
    return (
        <Flex bg={'white'} padding={0.5}>
            <HeadingWithIcon headingText={habit.name} bodyText={habit.extraNotes} iconName={'repeat'} />
            <IntentionsList intentions={intentions} readOnly={true}/>
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
            </Flex>
            );
            }

export default observer(HabitPage);
