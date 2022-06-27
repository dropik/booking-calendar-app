import React from "react";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchData from "./FetchData";
import Floors from "./Floors";

export default function Table(): JSX.Element {
  return (
    <DrawerAdjacent>
      <FetchData />
      <Floors />
    </DrawerAdjacent>
  );
}
