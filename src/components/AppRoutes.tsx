import React from "react";
import { Routes, Route } from "react-router-dom";

import Table from "./Table";
import Bookings from "./Bookings";
import BookingDetails from "./BookingDetails";
import Clients from "./Clients";

export default function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Table />} />
      <Route path="bookings" element={<Bookings />}>
        <Route path=":bookingId" element={<BookingDetails />} />
      </Route>
      <Route path="tools" element={"Strumenti"} />
      <Route path="clients" element={<Clients />} />
    </Routes>
  );
}
