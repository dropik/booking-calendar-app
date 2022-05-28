import React from "react";
import Typography from "@mui/material/Typography";

import M3AppBar from "../m3/M3AppBar";
import DrawerButton from "./DrawerButton";
import DateInput from "./DateInput";
import DownloadButton from "./DownloadButton";
import Box from "@mui/material/Box";

export default function Header(): JSX.Element {
  return (
    <M3AppBar>
      <Box sx={{
        display: "flex",
        alignItems: "baseline",
        flexBasis: "23rem",
      }}>
        <Box sx={{
          display: "flex",
          width: "5rem",
          justifyContent: "center"
        }}>
          <DrawerButton />
        </Box>
        <DateInput />
      </Box>
      <Typography variant="titleLarge" sx={{
        flexBasis: "11rem",
        textAlign: "center"
      }}>Booking Calendar</Typography>
      <Box sx={{
        display: "flex",
        justifyContent: "end",
        paddingRight: "1rem",
        flexBasis: "23rem",
        flexShrink: 0,
        minWidth: "11rem"
      }}>
        <DownloadButton />
      </Box>
    </M3AppBar>
  );
}
