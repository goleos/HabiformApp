import { Alert, Heading, HStack, Text, VStack } from "native-base";

export default function InfoAlert({ heading, text }) {
  return (
    <Alert
      marginX={2}
      marginY={1}
      borderRadius={10}
      shadow={2}
      status="info"
      colorScheme="info"
    >
      <VStack paddingY={1} paddingX={1} space={2} alignItems={"center"}>
        <HStack alignItems={"center"} space={1}>
          <Alert.Icon />
          {heading !== undefined && (
            <Heading fontSize={"lg"}>{heading}</Heading>
          )}
        </HStack>

        <Text>{text}</Text>
      </VStack>
    </Alert>
  );
}