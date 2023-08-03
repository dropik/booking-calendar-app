import React from "react";
import { Outlet } from "react-router-dom";
import DrawerAdjacent from "../m3/DrawerAdjacent";

export default function Tools(): JSX.Element {
  return (
    <DrawerAdjacent>
      <Outlet />
    </DrawerAdjacent>
  );
}
