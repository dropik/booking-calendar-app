import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AppRoot from "./AppRoot";
import Table from "./Table";
import Bookings from "./Bookings";
import BookingDetails from "./BookingDetails";
import Tools from "./Tools";
import Clients from "./Clients";
import Settings from "./Settings";
import Dashboard from "./Tools/Dashboard";
import Istat from "./Tools/Istat";
import Login from "./Login";

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/table" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppRoot />}>
        <Route path="table" element={<Table />} />
        <Route path="bookings" element={<Bookings />}>
          <Route path=":from/:bookingId" element={<BookingDetails />} />
        </Route>
        <Route path="tools" element={<Tools />}>
          <Route path="" element={<Dashboard />} />
          <Route path="istat" element={<Istat />} />
        </Route>
        <Route path="clients" element={<Clients />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
