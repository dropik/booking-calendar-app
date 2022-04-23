import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import M3AppBar from "./m3/M3AppBar";
import DrawerButton from "./header/DrawerButton";
import DateInput from "./header/DateInput";

export default function Header(): JSX.Element {
  return (
    <M3AppBar>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <DrawerButton />
        <Typography variant="titleLarge">Booking Calendar</Typography>
      </Box>
      <DateInput />
    </M3AppBar>
  );
}
