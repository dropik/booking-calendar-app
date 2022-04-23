import React from "react";
import Box from "@mui/material/Box";

import DrawerAdjacent from "./m3/DrawerAdjacent";
import MonthYear from "./dates-container/MonthYear";
import Dates from "./dates-container/Dates";
import UnassignedTilesPopup from "./dates-container/UnassignedTilesPopup";

import "./DatesContainer.css";

export default function DatesContainer(): JSX.Element {
  return (
    <Box className="dates-container">
      <DrawerAdjacent sx={{
        border: "2px solid black",
        borderBottom: "none"
      }}>
        <MonthYear key="monthYear" />
        <Dates />
        <UnassignedTilesPopup />
      </DrawerAdjacent>
    </Box>
  );
}
