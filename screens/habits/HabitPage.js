import { Button, Heading, Text } from "native-base";
import IntentionsList from "../../components/IntentionsList";

function HabitPage({ navigation, route }) {
  const habit = route.params.habit;
  const intentions = habit.intentions;
  return (
    <>
      <Text>{habit.name}</Text>
      <Heading>Implementation intentions</Heading>
      <IntentionsList intentions={intentions} readOnly={true} />
      <Button
        onPress={() => {
          navigation.navigate("ManageHabit", {
            habit: habit,
          });
        }}
      >
        Edit
      </Button>
    </>
  );
}

export default HabitPage;
