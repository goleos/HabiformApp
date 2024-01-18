import { Box } from "native-base";

export default function BasicBox({ children }) {
  return (
    <Box borderWidth={0} alignItems={"center"} padding={2} borderRadius={10} backgroundColor={"gray.100"}>
      {children}
    </Box>
  );
}