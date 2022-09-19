import React from "react";
import { Route, Routes } from "react-router-dom";
import Stack from "@mui/material/Stack";

import M3AppBar from "../m3/M3AppBar";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import CalendarHeader from "./CalendarHeader";
import Tint from "./Tint";
import BookingsHeader from "./BookingsHeader";
import BookingDetailsHeader from "./BookingDetailsHeader";
import LargeHeaderTitle from "./LargeHeaderTitle";

export default function TopAppBar(): JSX.Element {
  return (
    <M3AppBar sx={{
      position: "sticky",
      pr: "0 !important",
      display: "flex",
      flexDirection: "row"
    }}>
      <DrawerAdjacent sx={{ width: "100%", height: "100%" }}>
        <Stack spacing={0} direction="row" sx={{ width: "100%", height: "100%" }}>
          <Routes>
            <Route path="/" element={<CalendarHeader />} />
            <Route path="bookings" element={<BookingsHeader />}>
              <Route path=":bookingId" element={<BookingDetailsHeader />} />
            </Route>
            <Route path="tools" element={<LargeHeaderTitle>Strumenti</LargeHeaderTitle>} />
            <Route path="clients" element={<LargeHeaderTitle>Clienti</LargeHeaderTitle>} />
          </Routes>
        </Stack>
      </DrawerAdjacent>
      <Tint />
    </M3AppBar>
  );
}
