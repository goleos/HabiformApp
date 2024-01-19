import {Box, Button, Flex, Heading, HStack, Icon, ScrollView, Text, VStack} from "native-base";
import IntentionsList from "../../components/IntentionsList";
import { notificationsController } from "../../controllers/NotificationsController";
import { observer } from "mobx-react";
import HeadingWithIcon from "../../components/HeadingWithIcon";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { materialIconsNames } from "../../utils/constants";
import { triggersController } from "../../controllers/TriggersController";
import {i18n} from "../../utils/localisation";
import AppScreen from "../../components/AppScreen";
import SubDescription from "../../components/SubDescription";

function HabitPage({ navigation, route }) {
  const habit = route.params.habit;
  const intentions = habit.intentions;
  const trigger = triggersController.getTriggerById(habit.triggerEventID);
  return (
      <AppScreen>
          <ScrollView>


      <VStack margin={2} space={3}>
        <HeadingWithIcon
          headingText={habit.name}
          bodyText={habit.extraNotes}
          iconName={"repeat"}
        />

        {trigger !== undefined && (
            <SubDescription iconName={materialIconsNames.trigger} title={i18n.t("linkedTrigger")} value={trigger.name} />
        )}

          <Heading>{i18n.t("implementationIntentionsHeader")}</Heading>

        <IntentionsList
          includeTitle={false}
          intentions={intentions}
          readOnly={true}
        />
      </VStack>

          </ScrollView>
      <VStack space={1} padding={3}>
        <Button
          onPress={() => {
            navigation.navigate("ManageHabit", {
              habit: habit,
            });
          }}
        >
          {i18n.t("edit")}
        </Button>
      </VStack>
      </AppScreen>
  );
}

export default observer(HabitPage);
