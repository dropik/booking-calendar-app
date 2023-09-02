import React from "react";
import { BrowserRouter } from "react-router-dom";
import Box from "@mui/material/Box";

import M3GlobalStyles from "./components/m3/M3GlobalStyles";
import ResizeHandler from "./components/ResizeHandler";
import AppRoutes from "./components/AppRoutes";
import SnackbarMessage from "./components/SnackbarMessage";

export default function App(): JSX.Element {


  return (
    <BrowserRouter>
      <Box>
        <M3GlobalStyles />
        <AppRoutes />
        <SnackbarMessage />
        <ResizeHandler />
      </Box>
    </BrowserRouter>
  );
}
