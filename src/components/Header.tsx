import React from "react";
import Typography from "@mui/material/Typography";
import TodayIcon from "@mui/icons-material/Today";
import Box from "@mui/material/Box";

import M3AppBar from "./m3/M3AppBar";
import M3TextButton from "./m3/M3TextButton";
import SidemenuButton from "./header/SidemenuButton";

export default function Header(): JSX.Element {
  return (
    <M3AppBar>
      <Box sx={{ display: "flex" }}>
        <SidemenuButton />
        <Typography variant="titleLarge">Booking Calendar</Typography>
      </Box>
      <M3TextButton
        sx={{
          color: (theme) => theme.palette.onSurfaceVariant.main
        }}
        iconOnly
      >
        <TodayIcon />
      </M3TextButton>
    </M3AppBar>
  );
}
