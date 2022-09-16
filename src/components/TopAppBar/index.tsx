import React from "react";
import { Route, Routes } from "react-router-dom";

import M3AppBar from "../m3/M3AppBar";
import CalendarHeader from "./CalendarHeader";
import DrawerButton from "./DrawerButton";
import Tint from "./Tint";

export default function TopAppBar(): JSX.Element {
  return (
    <M3AppBar sx={{
      position: "sticky",
      pr: "0 !important",
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline"
    }}>
      <DrawerButton />
      <Routes>
        <Route path="/" element={<CalendarHeader />} />
        <Route path="/bookings" element={"Prenotazioni"} />
        <Route path="/tools" element={"Strumenti"} />
        <Route path="/clients" element={"Clienti"} />
      </Routes>
      <Tint />
    </M3AppBar>
  );
}
