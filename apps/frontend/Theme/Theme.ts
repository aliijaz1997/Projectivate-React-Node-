import { createTheme } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#00CCFF",
      "50": "#1DA1F2",
      "100": "#4285F4",
    },
    secondary: {
      main: "#D40000",
      "100": "#FF0000",
    },
    success: {
      main: "#15BF59",
      "50": "#00D455",
    },
    warning: {
      main: "#FFCC00",
    },
  },
});

export default theme;
export type CustomTheme = typeof theme;
