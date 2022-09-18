import React from "react";
import { Routes, Route } from "react-router-dom";

import DrawerAdjacent from "./m3/DrawerAdjacent";
import Table from "./Table";
import Bookings from "./Bookings";
import BookingDetails from "./BookingDetails";

export default function AppRoutes(): JSX.Element {
  return (
    <DrawerAdjacent>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="bookings" element={<Bookings />}>
          <Route path=":bookingId" element={<BookingDetails />} />
        </Route>
        <Route path="tools" element={"Strumenti"} />
        <Route path="clients" element={"Clienti"} />
      </Routes>
    </DrawerAdjacent>
  );
}
