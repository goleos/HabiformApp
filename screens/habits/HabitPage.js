import {Button, Heading, Text} from "native-base";
import IntentionsList from "../../components/IntentionsList";
import {notificationsController} from "../../controllers/NotificationsController";
import {observer} from "mobx-react";

function HabitPage({navigation, route}) {
    const habit = route.params.habit;
    const intentions = habit.intentions;
    return (
        <>
            <Text>{habit.name}</Text>
            <Heading>Implementation intentions</Heading>
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
            </>
            );
            }

export default observer(HabitPage);
