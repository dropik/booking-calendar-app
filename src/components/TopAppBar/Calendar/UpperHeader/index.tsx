import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DateInput from "./DateInput";

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
      <Box sx={{ pr: "0.5rem" }}></Box>
    </Box>
  );
}
