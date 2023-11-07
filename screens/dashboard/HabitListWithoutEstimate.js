import HabitList from "../../components/HabitList";
import { habitsController } from "../../controllers/HabitsController";
import { ScrollView } from "native-base";
import InfoAlert from "../../components/InfoAlert";
import {i18n} from "../../utils/localisation";

export default function HabitListWithoutEstimate() {
  const habits = habitsController.getUntimedActiveHabits();
  return (
    <ScrollView>
      <InfoAlert
        text={i18n.t("messageNoteOnAbsentTimedTriggers")}
        heading={i18n.t("note")}
      />
      <HabitList hideArrowButton={true} habits={habits} />
    </ScrollView>
  );
}