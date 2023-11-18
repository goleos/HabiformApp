import {Heading, HStack, Icon, Text, View, VStack} from "native-base";
import React from "react";
import ContentBox from "../ContentBox";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type triggerTypeListItemProps = {
    materialIcon: string;
    title: string;
    description: string;
    onPress?: () => void;
}

const TriggerTypeListItem = (props: triggerTypeListItemProps) => {
    return (
        <ContentBox hideArrowButton={true} onPress={props.onPress}>
        <HStack alignItems={"center"} space={2}>
    <Icon as={MaterialCommunityIcons} name={props.materialIcon} color={"primary.500"} size={50} />
    <View style={{marginLeft: 10}}>
    <Heading fontSize={"lg"}>{props.title}</Heading>
    <Text maxWidth={"85%"}>{props.description}</Text>
    </View>
    </HStack>
    </ContentBox>
    )
}

export default TriggerTypeListItem;