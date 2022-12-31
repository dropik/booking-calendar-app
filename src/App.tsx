import React from "react";
import { BrowserRouter } from "react-router-dom";
import Box from "@mui/material/Box";

import M3GlobalStyles from "./components/m3/M3GlobalStyles";
import ResizeHandler from "./components/ResizeHandler";
import AppDrawer from "./components/AppDrawer";
import DrawerButton from "./components/DrawerButton";
import AppRoutes from "./components/AppRoutes";
import SnackbarMessage from "./components/SnackbarMessage";
import FetchRoomTypes from "./components/Table/FetchData/FetchRoomTypes";
import FetchFloorsData from "./components/Table/FetchData/FetchFloorsData";

export default function App(): JSX.Element {


  return (
    <BrowserRouter>
      <Box>
        <M3GlobalStyles />
        <AppRoutes />
        <AppDrawer />
        <DrawerButton />
        <SnackbarMessage />
        <ResizeHandler />
        <FetchRoomTypes />
        <FetchFloorsData />
      </Box>
    </BrowserRouter>
  );
}
