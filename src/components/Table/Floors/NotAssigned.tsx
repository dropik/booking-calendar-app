import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import FloorHeader from "./FloorHeader";

export default function NotAssigned(): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{
      borderBottom: `1px solid ${theme.palette.outline.light}`
    }}>
      <FloorHeader name="Non Assegnati" collapseCallback={() => setOpen(!open)} />
    </Box>
  );
}
