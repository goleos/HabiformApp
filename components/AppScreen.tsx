import {View} from "native-base";

export default function AppScreen(props) {
    return <View flex={1} backgroundColor={"green.50"}>
        {props.children}
    </View>
}