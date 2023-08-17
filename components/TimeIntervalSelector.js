import { Alert, HStack, Stack, Text } from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function TimeIntervalSelector({
  onStartTimeChange,
  onEndTimeChange,
  defaultStart,
  defaultEnd,
}) {
  return (
    <Stack>
      <Alert maxW="400" status="info" colorScheme="info">
        Providing an approximate daily time interval in which your trigger event
        occurs lets the app remind you when you should complete your habit
      </Alert>
      <HStack justifyContent="center" alignItems="center">
          {/*https://github.com/react-native-datetimepicker/datetimepicker*/}
        <RNDateTimePicker
          display="inline"
          mode="time"
          value={defaultStart}
          onChange={(event, date) => {
              if (event.type === 'set') {
                  onStartTimeChange(date.toTimeString().split(" ")[0]);
              }

          }}
        />
        <Text>—</Text>
        <RNDateTimePicker
          mode="time"
          value={defaultEnd}
          onChange={(event, date) => {
              if (event.type === 'set') {
                  onEndTimeChange(date.toTimeString().split(" ")[0]);
              }
            console.log("end ch");
          }}
        />
      </HStack>
      {/*<Button.Group isAttached>*/}
      {/*  {weekdaysShort.map((day, index) => (*/}
      {/*    <Button*/}
      {/*      key={index}*/}
      {/*      variant={applicableDays.includes(day) ? "solid" : "outline"}*/}
      {/*      onPress={() => {*/}
      {/*        handleSelectDay(day, index);*/}
      {/*        console.log(applicableDays);*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      {day}*/}
      {/*    </Button>*/}
      {/*  ))}*/}
      {/*</Button.Group>*/}
    </Stack>
  );
}
