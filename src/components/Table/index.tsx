import React from "react";

import CalendarHeader from "../TopAppBar/CalendarHeader";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchData from "./FetchData";
import Sections from "./Sections";
import TextWidthCanvas from "./TextWidthCanvas";

export default function Table(): JSX.Element {
  return (
    <>
      <CalendarHeader />
      <DrawerAdjacent>
        <FetchData />
        <TextWidthCanvas>
          <Sections />
        </TextWidthCanvas>
      </DrawerAdjacent>
    </>
  );
}
