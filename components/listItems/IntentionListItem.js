import { Box, HStack, Input, Pressable, Text } from "native-base";
import { useRef, useState } from "react";
import {i18n} from "../../utils/localisation";

export default function IntentionListItem({
  intentionNumber,
  intentionText,
  onChangeText,
  isReadOnly,
}) {
  return (
    <Box shadow={3} backgroundColor={"white"} paddingX={3} borderRadius={8} my={1}>
      <HStack alignItems={"center"} space={3}>
        <Text fontSize={"5xl"}>{intentionNumber}</Text>
        <Input
          _focus={{ variant: "outline" }}
          isDisabled={isReadOnly}
          _disabled={{color: "black", opacity: '1'}}
          placeholder={i18n.t("intentionTextExample")}
          variant={"unstyled"}
          size={"xl"}
          value={intentionText}
          onChangeText={onChangeText}
          maxWidth={"93%"}
        />
      </HStack>
    </Box>
  );
}
