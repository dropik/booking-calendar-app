import React from "react";
import Box from "@mui/material/Box";

import DrawerAdjacent from "../../../m3/DrawerAdjacent";
import Dates from "./Dates";

export default function DatesContainer(): JSX.Element {
  return (
    <Box sx={{
      width: "100%",
      flexGrow: 1
    }}>
      <DrawerAdjacent sx={{
        height: "100%"
      }}>
        <Dates />
      </DrawerAdjacent>
    </Box>
  );
}
