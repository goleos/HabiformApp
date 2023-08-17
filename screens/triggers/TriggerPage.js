import {
  Text,
  Container,
  Flex,
  VStack,
  Heading,
  HStack,
  Icon,
  Box,
  Button,
} from "native-base";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import HabitListItem from "../../components/HabitListItem";
import { hab } from "../../models/habit";

function TriggerPage({ navigation, route }) {
  const trigger = route.params.trigger;
  return (
    <Flex height={"100%"} bg={"white"}>
      <VStack margin={2} space={2}>
        <VStack alignItems={"center"} space={0}>
          <Text>{"Trigger id:" + trigger.triggerEventID} </Text>
          <Icon as={Ionicons} size={100} name="alarm" color="primary.800" />
          <Heading>{trigger.name}</Heading>
          <Text>{trigger.extraNotes}</Text>
        </VStack>

        <Box borderRadius={10} bg={"blue.200"} padding={2}>
          <VStack alignItems={"center"}>
            <HStack alignItems={"center"} space={1}>
              <Icon as={Ionicons} size={25} name="time" color="blue.700" />
              <Heading fontSize={18}>Estimated Time Interval</Heading>
            </HStack>
            {trigger.timeIntervalStart != null ? (
              <Text>
                {trigger.timeIntervalStart} — {trigger.timeIntervalEnd}
              </Text>
            ) : (
              <Text color={"gray.600"} italic>
                Not provided
              </Text>
            )}
          </VStack>
        </Box>

        <Heading>Linked habits</Heading>
        <HabitListItem habit={hab} />
      </VStack>
      <Button
        onPress={() => {
          navigation.navigate("Add trigger", {
            trigger: trigger,
          });
        }}
      >
        Edit
      </Button>
    </Flex>
  );
}

export default TriggerPage;