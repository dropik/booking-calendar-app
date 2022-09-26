import React from "react";
import Box from "@mui/material/Box";

import Dates from "./Dates";

export default function DatesContainer(): JSX.Element {
  return (
    <Box sx={{
      width: "100%",
      flexGrow: 1
    }}>
      <Dates />
    </Box>
  );
}
