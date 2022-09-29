import React from "react";
import { BrowserRouter } from "react-router-dom";
import Box from "@mui/material/Box";

import M3GlobalStyles from "./components/m3/M3GlobalStyles";
import ResizeHandler from "./components/ResizeHandler";
import AppDrawer from "./components/AppDrawer";
import DrawerButton from "./components/DrawerButton";
import AppRoutes from "./components/AppRoutes";
import SaveAndResetWidget from "./components/SaveAndResetWidget";
import SnackbarMessage from "./components/SnackbarMessage";

export default function App(): JSX.Element {


  return (
    <BrowserRouter>
      <Box>
        <M3GlobalStyles />
        <AppRoutes />
        <AppDrawer />
        <DrawerButton />
        <SaveAndResetWidget />
        <SnackbarMessage />
        <ResizeHandler />
      </Box>
    </BrowserRouter>
  );
}
