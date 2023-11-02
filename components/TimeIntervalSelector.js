import { HStack, Stack, Text } from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function TimeIntervalSelector({
  onStartTimeChange,
  onEndTimeChange,
  defaultStart,
  defaultEnd,
}) {
  return (
    <Stack>
      <HStack justifyContent="center" alignItems="center">
        {/*Example taken from https://github.com/react-native-datetimepicker/datetimepicker [Accessed July 2023]*/}
        <RNDateTimePicker
          display="inline"
          mode="time"
          value={defaultStart}
          onChange={(event, date) => {
            if (event.type === "set") {
              onStartTimeChange(date);
            }
          }}
        />
        <Text>—</Text>
        <RNDateTimePicker
          mode="time"
          value={defaultEnd}
          onChange={(event, date) => {
            if (event.type === "set") {
              onEndTimeChange(date);
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
