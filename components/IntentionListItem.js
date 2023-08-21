import { Box, HStack, Input, Pressable, Text } from "native-base";
import { useRef, useState } from "react";

export default function IntentionListItem({
  intentionNumber,
  intentionText,
  onChangeText,
  isReadOnly,
}) {
  return (
    <Box shadow={3} backgroundColor={"white"} paddingX={3}>
      <HStack alignItems={"center"} space={3}>
        <Text fontSize={"5xl"}>{intentionNumber}</Text>
        <Input
          _focus={{ variant: "outline" }}
          isDisabled={isReadOnly}
          placeholder={'eg. take a bus to the gym'}
          variant={"unstyled"}
          size={"xl"}
          value={intentionText}
          onChangeText={onChangeText}
        />
      </HStack>
    </Box>
  );
}
