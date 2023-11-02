import HabitList from "../../components/HabitList";
import { habitsController } from "../../controllers/HabitsController";
import { ScrollView } from "native-base";
import InfoAlert from "../../components/InfoAlert";

export default function HabitListWithoutEstimate() {
  const habits = habitsController.getUntimedActiveHabits();
  return (
    <ScrollView>
      <InfoAlert
        text={
          "These habits are linked to a trigger that does not have an estimated time interval. This means that the app cannot remind you about these habits."
        }
        heading={"Note"}
      />
      <HabitList hideArrowButton={true} habits={habits} />
    </ScrollView>
  );
}