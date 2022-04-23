import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import M3AppBar from "./m3/M3AppBar";
import DrawerAdjacent from "./m3/DrawerAdjacent";
import DrawerButton from "./header/DrawerButton";
import DateInput from "./header/DateInput";

export default function Header(): JSX.Element {
  return (
    <M3AppBar>
      <DrawerAdjacent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DrawerButton />
          <Typography variant="titleLarge">Booking Calendar</Typography>
        </Box>
        <DateInput />
      </DrawerAdjacent>
    </M3AppBar>
  );
}
