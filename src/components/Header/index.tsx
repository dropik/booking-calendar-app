import React from "react";
import Typography from "@mui/material/Typography";

import M3AppBar from "../m3/M3AppBar";
import DrawerButton from "./DrawerButton";
import DateInput from "./DateInput";
import DownloadButton from "./DownloadButton";
import Box from "@mui/material/Box";

export default function Header(): JSX.Element {
  return (
    <M3AppBar sx={{
      "& > div": {
        flexBasis: "30%"
      }
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "baseline"
      }}>
        <Box sx={{
          display: "flex",
          width: "5rem",
          justifyContent: "center"
        }}>
          <DrawerButton />
        </Box>
        <Typography variant="titleLarge">Booking Calendar</Typography>
      </Box>
      <DateInput />
      <Box sx={{
        display: "flex",
        justifyContent: "end",
        paddingRight: "1rem"
      }}>
        <DownloadButton />
      </Box>
    </M3AppBar>
  );
}
