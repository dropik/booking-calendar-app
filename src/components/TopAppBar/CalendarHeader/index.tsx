import React from "react";
import Box from "@mui/material/Box";

import UpperHeader from "./UpperHeader";
import DatesContainer from "./DatesContainer";

export default function CalendarHeader(): JSX.Element {
  return (
    <Box sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      <UpperHeader />
      <DatesContainer />
    </Box>
  );
}
