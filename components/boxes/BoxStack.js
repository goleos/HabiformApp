import { Box, Divider, Heading, View } from "native-base";
import { Children } from "react";

export default function BoxStack({ children, title }) {
  const childrenArray = Children.toArray(children);
  const divider = <Divider thickness={1} my={2} ml={2} />;
  const heading = (
    <Heading fontSize={"xl"} ml={1} mb={1}>
      {title}
    </Heading>
  );
  return (
    <>
      {title !== undefined && heading}
      <Box bg={"gray.200"} borderRadius={10} padding={2}>
        {childrenArray.map((child, index) => {
          return index !== childrenArray.length - 1 ? (
            <View key={index}>
              {child}
              {divider}
            </View>
          ) : (
            child
          );
        })}
      </Box>
    </>
  );
}
