import React from "react";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import Sections from "./Sections";
import TextWidthCanvas from "./TextWidthCanvas";
import ScrollingHandler from "../ScrollingHandler";
import SaveAndResetWidget from "../SaveAndResetWidget";
import FetchTiles from "./FetchTiles";
import CalendarTopBar from "../TopAppBar/CalendarTopBar";

export default function Table(): JSX.Element {
  return (
    <>
      <CalendarTopBar />
      <DrawerAdjacent>
        <FetchTiles />
        <TextWidthCanvas>
          <Sections />
        </TextWidthCanvas>
      </DrawerAdjacent>
      <SaveAndResetWidget />
      <ScrollingHandler />
    </>
  );
}
