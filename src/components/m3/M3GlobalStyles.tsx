import React from "react";
import { useTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function M3GlobalStyles(): JSX.Element {
  const theme = useTheme();

  return (
    <GlobalStyles styles={{
      html: {
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        backgroundColor: theme.palette.surface.main
      },
      body: {
        margin: 0
      }
    }} />
  );
}
