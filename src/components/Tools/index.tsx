import React from "react";
import { Outlet } from "react-router-dom";
import M3DrawerAdjacent from "../m3/M3DrawerAdjacent";

export default function Tools(): JSX.Element {
  return (
    <M3DrawerAdjacent>
      <Outlet />
    </M3DrawerAdjacent>
  );
}
