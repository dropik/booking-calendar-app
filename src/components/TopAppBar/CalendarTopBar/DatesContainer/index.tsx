import React from "react";
import Box from "@mui/material/Box";

import Dates from "./Dates";

export default function DatesContainer(): JSX.Element {
  return (
    <Box sx={{
      width: "100%",
      height: "5.5rem"
    }}>
      <Dates />
    </Box>
  );
}
