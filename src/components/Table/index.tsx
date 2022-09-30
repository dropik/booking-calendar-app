import React from "react";

import CalendarTopBar from "../TopAppBar/Calendar";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchData from "./FetchData";
import Sections from "./Sections";
import TextWidthCanvas from "./TextWidthCanvas";
import ScrollingHandler from "../ScrollingHandler";
import SaveAndResetWidget from "../SaveAndResetWidget";

export default function Table(): JSX.Element {
  return (
    <>
      <CalendarTopBar />
      <DrawerAdjacent>
        <FetchData />
        <TextWidthCanvas>
          <Sections />
        </TextWidthCanvas>
      </DrawerAdjacent>
      <SaveAndResetWidget />
      <ScrollingHandler />
    </>
  );
}
