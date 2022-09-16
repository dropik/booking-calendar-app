import React from "react";
import { Routes, Route } from "react-router-dom";

import DrawerAdjacent from "./m3/DrawerAdjacent";
import Table from "./Table";

export default function AppRoutes(): JSX.Element {
  return (
    <DrawerAdjacent>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/bookings" element={"Prenotazioni"} />
        <Route path="/tools" element={"Strumenti"} />
        <Route path="/clients" element={"Clienti"} />
      </Routes>
    </DrawerAdjacent>
  );
}
