import {Icon, IconButton, IIconButtonProps} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type PropsHeaderIconButton = {
    materialIconName?: string;
} & IIconButtonProps;

const HeaderIconButton = (props: PropsHeaderIconButton) => {
  return (
    <IconButton
      icon={<Icon as={MaterialCommunityIcons} name={props.materialIconName} />}
      size={"lg"}
      borderRadius={"full"}
      _pressed={{ bg: null, opacity: 0.5 }}
      {...props}
    />
  );
};

export default HeaderIconButton;
