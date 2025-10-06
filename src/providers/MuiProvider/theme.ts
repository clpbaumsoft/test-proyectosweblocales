import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#E06E1F",
      light: "#f47522",
      //dark: "#ea5c1f",
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
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

export default theme;
