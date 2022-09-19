import React from "react";
import { BrowserRouter } from "react-router-dom";
import Box from "@mui/material/Box";

import M3GlobalStyles from "./components/m3/M3GlobalStyles";
import ResizeHandler from "./components/ResizeHandler";
import ScrollingHandler from "./components/ScrollingHandler";
import AppDrawer from "./components/AppDrawer";
import DrawerButton from "./components/DrawerButton";
import AppRoutes from "./components/AppRoutes";
import SaveAndResetWidget from "./components/SaveAndResetWidget";
import ConnectionError from "./components/ConnectionError";
import Dialog from "./components/Dialog";
import PoliceDownloadDialog from "./components/dialogs/PoliceDownloadDialog";
import IstatDownloadDialog from "./components/dialogs/IstatDownloadDialog";

export default function App(): JSX.Element {


  return (
    <BrowserRouter>
      <Box>
        <M3GlobalStyles />
        <AppRoutes />
        <AppDrawer />
        <DrawerButton />
        <SaveAndResetWidget />
        <ConnectionError />
        <Dialog />
        <PoliceDownloadDialog />
        <IstatDownloadDialog />
        <ResizeHandler />
        <ScrollingHandler />
      </Box>
    </BrowserRouter>
  );
}
