"use client"

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

//Theme
import theme from "./theme";

//Interfaces and types
import { BaseComponentProps } from "@/interfaces/General";

export default function MuiProvider({ children }: BaseComponentProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}