import { NativeBaseProvider, extendTheme } from "native-base";

export const uiTheme = extendTheme({
  colors: {
    // https://json-color-palette-generator.vercel.app/
    // primary: {
    //   50: "#9cc1fd",
    //   100: "#7babf8",
    //   200: "#5b95f1",
    //   300: "#3e7fe7",
    //   400: "#1c68e3",
    //   500: "#2061c8",
    //   600: "#2359ae",
    //   700: "#255096",
    //   800: "#C9E2BB",
    //   900: "#64864A",
    // },
  primary: {
  "50": "#e4f8de",
      "100": "#cbefbf",
      "200": "#b3e4a3",
      "300": "#9cd688",
      "400": "#82cc69",
      "500": "#78c060",
      "600": "#6db257",
      "700": "#669e53",
      "800": "#5f8851",
      "900": "#58734e"
},
    // secondary: {
    //   50: "#e89cf8",
    //   100: "#de7cf1",
    //   200: "#d15fe8",
    //   300: "#c344dd",
    //   400: "#b627d3",
    //   500: "#a12ab9",
    //   600: "#8d2ca1",
    //   700: "#7a2c8a",
    //   800: "#682b74",
    //   900: "#56295f",
    // },
  secondary: {
  "50": "#dffafc",
      "100": "#bdf2f7",
      "200": "#9de8ef",
      "300": "#7fdce5",
      "400": "#5fd3de",
      "500": "#51c9d4",
      "600": "#46bdc8",
      "700": "#40acb6",
      "800": "#40969e",
      "900": "#408187"
},
    delete: {
      50: "#f89c9c",
      100: "#f17c7c",
      200: "#e85f5f",
      300: "#dd4444",
      400: "#d32727",
      500: "#b92a2a",
      600: "#a12c2c",
      700: "#8a2c2c",
      800: "#742b2b",
      900: "#5f2929",
    },
    heading: {
      50: "#96d9e5",
      100: "#7bcad8",
      200: "#63b9c8",
      300: "#4da6b6",
      400: "#408e9c",
      500: "#3f7b85",
      600: "#3c6870",
      700: "#39575c",
      800: "#33464a",
      900: "#2d3739",
    },
    habitColour: {
      100: "#24b3f1",
    },
    trigger: {
      50: "#df9cf8",
      100: "#d27cf1",
      200: "#c35fe8",
      300: "#b444dd",
      400: "#a527d3",
      500: "#932ab9",
      600: "#822ca1",
      700: "#712c8a",
      800: "#602b74",
      900: "#51295f",
    },
    welcomeIcon: {
      base: "#a527d3",
    },
    triggerColour: {
      100: "#641683",
    },
    tabBarColour: {
      focused: "#0b4f93",
      unFocused: "#c47700",
    },
  },
  components: {
    Button: {
      defaultProps: {
        borderRadius: 16,
        size: "lg",
      },
    },
    Heading: {
      defaultProps: {
        color: "heading.600",
      },
    },
  },
});
