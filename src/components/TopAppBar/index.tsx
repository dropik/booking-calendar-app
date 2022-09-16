import { Box, Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import M3AppBar from "../m3/M3AppBar";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import CalendarHeader from "./CalendarHeader";
import DrawerButton from "./DrawerButton";
import Tint from "./Tint";

export default function TopAppBar(): JSX.Element {
  return (
    <M3AppBar sx={{
      position: "sticky",
      pr: "0 !important",
      display: "flex",
      flexDirection: "row"
    }}>
      <DrawerButton />
      <Box sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}>
        <Routes>
          <Route path="/" element={<CalendarHeader />} />
          <Route path="/bookings" element={<LargeHeaderTitle />} />
          <Route path="/tools" element={"Strumenti"} />
          <Route path="/clients" element={"Clienti"} />
        </Routes>
      </Box>
      <Tint />
    </M3AppBar>
  );
}

function LargeHeaderTitle(): JSX.Element {
  return (
    <DrawerAdjacent>
      <Typography variant="headlineMedium" sx={{
        pl: "1rem",
        pt: "5.5rem"
      }}>
        Prenotazioni
      </Typography>
    </DrawerAdjacent>
  );
}
