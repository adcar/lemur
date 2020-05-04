import {DefaultTheme} from "react-native-paper";

const theme = {
  dark: true,
  colors: {
    primary: "#8e44ad",
    background: "#14151a",
    text: "#ffffff",
  },
};

export const paperTheme = {
  ...DefaultTheme,
  ...theme,
  roundness: 2,
  mode: "adaptive",

  colors: {
    ...DefaultTheme.colors,
    ...theme.colors,
    accent: "#2196F3",
    surface: "#121212",
    placeholder: "#7f8c8dff",
  },
};

export const navigationTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    card: paperTheme.colors.surface,
    border: "rgb(199, 199, 204)",
  },
};
