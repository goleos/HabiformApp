import { Alert, HStack, Stack, Text } from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import InfoAlert from "./InfoAlert";

export default function TimeIntervalSelector({
  onStartTimeChange,
  onEndTimeChange,
  defaultStart,
  defaultEnd,
}) {

  return (
    <Stack>
      <HStack justifyContent="center" alignItems="center">
          {/*https://github.com/react-native-datetimepicker/datetimepicker*/}
        <RNDateTimePicker
          display="inline"
          mode="time"
          value={defaultStart}
          onChange={(event, date) => {
              if (event.type === 'set') {
                  onStartTimeChange(date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
              }

          }}
        />
        <Text>—</Text>
        <RNDateTimePicker
          mode="time"
          value={defaultEnd}
          onChange={(event, date) => {
              if (event.type === 'set') {
                  onEndTimeChange(date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
              }
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
