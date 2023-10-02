import React from "react";

import { useAppSelector } from "../../redux/hooks";

import M3DrawerAdjacent from "../m3/M3DrawerAdjacent";
import Sections from "./Sections";
import TextWidthCanvas from "./TextWidthCanvas";
import ScrollingHandler from "../ScrollingHandler";
import SaveAndResetWidget from "../SaveAndResetWidget";
import FetchTiles from "./FetchTiles";
import CalendarTopBar from "../TopAppBar/CalendarTopBar";
import PanoramicView from "./PanoramicView";

export default function Table(): JSX.Element {
  const isPanoramicView = useAppSelector(state => state.table.isPanoramicView);

  return (
    <>
      <CalendarTopBar />
      <M3DrawerAdjacent>
        <FetchTiles />
        <TextWidthCanvas>
          {isPanoramicView ? <PanoramicView /> : <Sections />}
        </TextWidthCanvas>
      </M3DrawerAdjacent>
      <SaveAndResetWidget />
      <ScrollingHandler />
    </>
  );
}
