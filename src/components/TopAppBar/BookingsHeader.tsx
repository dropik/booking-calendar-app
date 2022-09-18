import React from "react";
import { Outlet } from "react-router-dom";

import LargeHeaderTitle from "./LargeHeaderTitle";

export default function BookingsHeader(): JSX.Element {
  return (
    <>
      <LargeHeaderTitle>Prenotazioni</LargeHeaderTitle>
      <Outlet />
    </>
  );
}
