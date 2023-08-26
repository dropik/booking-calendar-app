import React from "react";
import { useTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useAppSelector } from "../../redux/hooks";

export default function M3GlobalStyles(): JSX.Element {
  const theme = useTheme();
  const surfaceDim = useAppSelector(state => state.layout.surfaceDim);

  return (
    <GlobalStyles styles={{
      html: {
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        backgroundColor: surfaceDim
          ? theme.palette.surfaceDim.main
          : theme.palette.surface.main,
        transition: theme.transitions.create(["background-color"], {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.emphasized
        }),
      },
      body: {
        margin: 0,
        ...{ overflow: "auto" },
        ...{ overflow: "overlay" },
      },
      "*::-webkit-scrollbar": {
        width: "1rem",
        height: "1rem",
      },
      "*::-webkit-scrollbar-track": {
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "0.5rem",
        border: "0.25rem solid transparent",
        backgroundClip: "content-box",
      },
      "*::-webkit-scrollbar-thumb:hover": {
        backgroundColor: theme.palette.outline.main,
      },
    }} />
  );
}
