import React from "react";

import M3DrawerAdjacent from "../m3/M3DrawerAdjacent";
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
      <M3DrawerAdjacent>
        <FetchTiles />
        <TextWidthCanvas>
          <Sections />
        </TextWidthCanvas>
      </M3DrawerAdjacent>
      <SaveAndResetWidget />
      <ScrollingHandler />
    </>
  );
}
