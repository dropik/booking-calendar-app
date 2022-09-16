import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DateInput from "./DateInput";
import DatesContainer from "./DatesContainer";
import DownloadButton from "./DownloadButton";

export default function CalendarHeader(): JSX.Element {
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      <Box sx={{
        display: "flex",
        height: "4rem",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <Box sx={{
          display: "flex",
          alignItems: "baseline",
          flexBasis: "23rem",
        }}>

          <DateInput />
        </Box>
        <Typography variant="titleLarge" sx={{
          flexBasis: "11rem",
          textAlign: "center"
        }}>Booking Calendar</Typography>
        <Box sx={{
          display: "flex",
          justifyContent: "end",
          paddingRight: "0.5rem",
          flexBasis: "23rem",
          flexShrink: 0,
          minWidth: "11rem"
        }}>
          <DownloadButton />
        </Box>
      </Box>
      <DatesContainer />
    </Box>
  );
}
