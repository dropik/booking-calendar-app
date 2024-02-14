import React from "react";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

import AppRoot from "./AppRoot";
import Table from "./Table";
import Bookings from "./Bookings";
import BookingDetails from "./BookingDetails";
import Tools from "./Tools";
import Clients from "./Clients";
import Settings from "./Settings";
import Istat from "./Tools/Istat";
import Login from "./Login";

export default function AppRoutes(): JSX.Element {
  const auth = useAppSelector(state => state.auth);
  const isAuthenticated = auth && auth.accessToken && auth.accessToken !== "" && auth.refreshToken && auth.refreshToken !== "";

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/app/table" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<AppRoot />}>
        <Route path="table" element={<Table />} />
        <Route path="bookings" element={<Bookings />}>
          <Route path=":from/:bookingId" element={<BookingDetails />} />
        </Route>
        <Route path="tools" element={<Outlet />}>
          <Route path="" element={<Tools />} />
          <Route path="istat" element={<Istat />} />
        </Route>
        <Route path="clients" element={<Clients />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
