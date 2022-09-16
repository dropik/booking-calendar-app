import React from "react";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";

import M3AppBar from "../m3/M3AppBar";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import CalendarHeader from "./CalendarHeader";
import DrawerButton from "./DrawerButton";
import Tint from "./Tint";
import LargeHeaderTitle from "./LargeHeaderTitle";

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
        <DrawerAdjacent sx={{ height: "100%" }}>
          <Routes>
            <Route path="/" element={<CalendarHeader />} />
            <Route path="/bookings" element={<LargeHeaderTitle>Prenotazioni</LargeHeaderTitle>} />
            <Route path="/tools" element={<LargeHeaderTitle>Strumenti</LargeHeaderTitle>} />
            <Route path="/clients" element={<LargeHeaderTitle>Clienti</LargeHeaderTitle>} />
          </Routes>
        </DrawerAdjacent>
      </Box>
      <Tint />
    </M3AppBar>
  );
}
