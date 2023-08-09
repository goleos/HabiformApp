import {Alert, HStack, Stack, Text} from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function TimeIntervalSelector({onStartTimeChange, onEndTimeChange}) {
    return <Stack>
        <Alert maxW="400" status="info" colorScheme="info">
            Providing an approximate daily time interval in which your trigger
            event occurs lets the app remind you when you should complete your
            habit
        </Alert>
        <HStack justifyContent="center" alignItems="center">
            <RNDateTimePicker
                display="inline"
                mode="time"
                value={new Date(2021, 12, 4, 4, 12)}
                onChange={(event, date) => {
                    onStartTimeChange(date.toTimeString().split(" ")[0]);
                }}
            />
            <Text>—</Text>
            <RNDateTimePicker
                mode="time"
                value={new Date(2021, 12, 4, 4, 12)}
                onChange={(event, date) => {
                    onEndTimeChange(date.toTimeString().split(" ")[0]);
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
}