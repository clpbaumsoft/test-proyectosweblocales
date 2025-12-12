import { createTheme } from "@mui/material/styles";

const proquinalDarkTeal = "#00575f";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: proquinalDarkTeal,
      light: "#f47522",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ea5c1f",
      light: "#f47522",
      dark: "#ea5c1f",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});

export default theme;
