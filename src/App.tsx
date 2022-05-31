import React from "react";
import Box from "@mui/material/Box";

import M3GlobalStyles from "./components/m3/M3GlobalStyles";
import ResizeHandler from "./components/ResizeHandler";
import TopAppBar from "./components/TopAppBar";
import AppDrawer from "./components/AppDrawer";
import Table from "./components/Table";
import SaveAndResetWidget from "./components/SaveAndResetWidget";
import ConnectionError from "./components/ConnectionError";
import Dialog from "./components/Dialog";
import PoliceDownloadDialog from "./components/dialogs/PoliceDownloadDialog";
import IstatDownloadDialog from "./components/dialogs/IstatDownloadDialog";

export default function App(): JSX.Element {
  return (
    <Box>
      <M3GlobalStyles />
      <ResizeHandler />
      <TopAppBar />
      <AppDrawer />
      <Table />
      <SaveAndResetWidget />
      <ConnectionError />
      <Dialog />
      <PoliceDownloadDialog />
      <IstatDownloadDialog />
    </Box>
  );
}
