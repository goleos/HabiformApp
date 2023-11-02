import { Alert, HStack, Stack, Text } from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import InfoAlert from "./InfoAlert";

export default function TimeIntervalSelector({
  onStartTimeChange,
  onEndTimeChange,
  defaultStart,
  defaultEnd,
}) {
  const defaultIntervalStart = new Date(2021, 12, 4, 7, 0);
  const defaultIntervalEnd = new Date(2021, 12, 4, 8, 0);

  return (
    <Stack>
      <HStack justifyContent="center" alignItems="center">
        {/*Example taken from https://github.com/react-native-datetimepicker/datetimepicker [Accessed July 2023]*/}
        <RNDateTimePicker
          display="inline"
          mode="time"
          value={defaultStart ? defaultStart : defaultIntervalStart}
          onChange={(event, date) => {
            if (event.type === "set") {
              onStartTimeChange(date);
            }
          }}
        />
        <Text>—</Text>
        <RNDateTimePicker
          mode="time"
          value={defaultEnd ? defaultEnd : defaultIntervalEnd}
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
