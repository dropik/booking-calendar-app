import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import Box from "@mui/material/Box";

import Header from "./components/Header";
import DatesContainer from "./components/DatesContainer";
import Hotel from "./components/Hotel";
import TableContainer from "./components/TableContainer";
import SaveAndResetWidget from "./components/SaveAndResetWidget";
import AppDrawer from "./components/AppDrawer";
import Dialog from "./components/Dialog";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function App(): JSX.Element {
  const theme = useTheme();

  useWindowCursorGrabbingEffect();

  return (
    <Box sx={{
      "& .MuiSvgIcon-root": {
        verticalAlign: "text-bottom"
      }
    }}>
      <GlobalStyles styles={{
        html: {
          fontFamily: "Roboto, Arial, Helvetica, sans-serif",
          backgroundColor: theme.palette.surface.main,
          "&.tile-grabbing": {
            cursor: "grabbing"
          }
        }
      }} />
      <Header />
      <AppDrawer />
      <DatesContainer />
      <Hotel />
      <TableContainer />
      <SaveAndResetWidget />
      <Dialog />
    </Box>
  );
}

function useWindowCursorGrabbingEffect(): void {
  useEffect(() => {
    function setCursorGrabbing() {
      document.documentElement.classList.add("tile-grabbing");
    }

    function unsetCursorGrabbing() {
      document.documentElement.classList.remove("tile-grabbing");
    }

    window.addEventListener("mousedown", setCursorGrabbing);
    window.addEventListener("mouseup", unsetCursorGrabbing);

    return () => {
      window.removeEventListener("mousedown", setCursorGrabbing);
      window.removeEventListener("mouseup", unsetCursorGrabbing);
    };
  }, []);
}
