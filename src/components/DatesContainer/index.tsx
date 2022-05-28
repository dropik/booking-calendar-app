import React from "react";
import Box from "@mui/material/Box";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import Dates from "./Dates";

import "./DatesContainer.css";

export default function DatesContainer(): JSX.Element {
  return (
    <Box className="dates-container">
      <DrawerAdjacent sx={{
        border: "2px solid black"
      }}>
        <Dates />
      </DrawerAdjacent>
    </Box>
  );
}
