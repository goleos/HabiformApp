import { View, VStack } from "native-base";
import React from "react";

type appScreenProps = {
  spaceBetween?: boolean;
  padding?: number;
  children: any;
} & typeof defaultProps;

const defaultProps = {
  spaceBetween: true,
  padding: 0,
};

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/
const AppScreen = (props: appScreenProps) => {
  return (
    <VStack
      flex={1}
      backgroundColor={"#cfd3f6"}
      justifyContent={(props.spaceBetween) ? "space-between" : undefined}
      padding={props.padding}
    >
      {props.children}
    </VStack>
  );
};
AppScreen.defaultProps = defaultProps;

export default AppScreen;
