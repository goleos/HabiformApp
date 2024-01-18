import { Box, Heading, HStack, Icon, Text, View, VStack } from "native-base";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { i18n } from "../utils/localisation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type subDescriptionProps = {
  iconName: string;
  title: string;
  value: string;
} & typeof defaultProps;

const defaultProps = {

};

const SubDescription = (props: subDescriptionProps) => {
  return (
    <Box borderRadius={10} bg={"blue.200"} padding={2}>
      <VStack alignItems={"center"}>
        <HStack alignItems={"center"} space={1}>
          <Icon as={MaterialCommunityIcons} size={25} name={props.iconName} color="blue.700" />
          <Heading fontSize={18}>{props.title}</Heading>
        </HStack>
        <Text>{props.value}</Text>
      </VStack>
    </Box>
  );
};

export default SubDescription;
