import { NativeBaseProvider, extendTheme } from "native-base";

export const uiTheme = extendTheme({
  colors: {
    // https://json-color-palette-generator.vercel.app/
    "primary": {
    "50": "#bdc6e9",
        "100": "#a3aeda",
        "200": "#8b98ca",
        "300": "#7683b7",
        "400": "#5c6baa",
        "500": "#596493",
        "600": "#565e7e",
        "700": "#52576a",
        "800": "#4d4f58",
        "900": "#464647"
},
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
      focused: "#35387D",
      unFocused: "#8c7e71",
    },
      backgroundColour1: "#cfd3f6"
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
