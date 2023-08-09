import { NativeBaseProvider, extendTheme } from "native-base";

export const uiTheme = extendTheme({
  colors: {
    primary: {
      50: "#51ff65",
      100: "#34ff4c",
      200: "#19fd33",
      300: "#07f123",
      400: "#07d51f",
      500: "#0bc020",
      600: "#0eab20",
      700: "#109720",
      800: "#12851f",
      900: "#13721e",
    },
    habitColour: {
      100: "#24b3f1",
    },
    triggerColour: {
      100: "#641683",
    },
  },
});
