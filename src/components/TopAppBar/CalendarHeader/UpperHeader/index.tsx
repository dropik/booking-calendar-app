import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DateInput from "./DateInput";
import DownloadButton from "./DownloadButton";

export default function UpperHeader(): JSX.Element {
  return (
    <Box sx={{
      display: "flex",
      height: "4rem",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "baseline"
      }}>

        <DateInput />
      </Box>
      <Typography variant="titleLarge" sx={{
        textAlign: "center"
      }}>Booking Calendar</Typography>
      <Box sx={{
        display: "flex",
        justifyContent: "end",
        paddingRight: "0.5rem",
        flexShrink: 0,
        minWidth: "11rem"
      }}>
        <DownloadButton />
      </Box>
    </Box>
  );
}