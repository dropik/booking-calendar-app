import React from "react";

import Box from "@mui/material/Box";

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
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      boxSizing: "border-box",
    }}>
      <CalendarTopBar />
      <M3DrawerAdjacent>
        <FetchTiles />
        <TextWidthCanvas>
          {isPanoramicView ? <PanoramicView /> : <Sections />}
        </TextWidthCanvas>
      </M3DrawerAdjacent>
      <SaveAndResetWidget />
      <ScrollingHandler />
    </Box>
  );
}
