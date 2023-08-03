import React from "react";
import { Routes, Route } from "react-router-dom";

import Table from "./Table";
import Bookings from "./Bookings";
import BookingDetails from "./BookingDetails";
import Tools from "./Tools";
import Clients from "./Clients";
import Settings from "./Settings";
import Typography from "@mui/material/Typography";
import Dashboard from "./Tools/Dashboard";

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Table />} />
      <Route path="bookings" element={<Bookings />}>
        <Route path=":from/:bookingId" element={<BookingDetails />} />
      </Route>
      <Route path="tools" element={<Tools />}>
        <Route path="" element={<Dashboard />} />
        <Route path="istat" element={<Typography>ISTAT</Typography>} />
      </Route>
      <Route path="clients" element={<Clients />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  );
}
