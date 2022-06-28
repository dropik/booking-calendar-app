import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import { FloorData } from "../../../redux/hotelSlice";

import Rooms from "./Rooms";
import FloorHeader from "./FloorHeader";

type FloorProps = {
  data: FloorData
}

export default function Floor({ data }: FloorProps): JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{
      borderBottom: `1px solid ${theme.palette.outline.light}`
    }}>
      <FloorHeader name={data.name} collapseCallback={() => setOpen(!open)} />
      <Collapse in={open} easing={theme.transitions.easing.fastOutSlowIn} timeout={theme.transitions.duration.long}>
        <Rooms data={data.rooms} />
      </Collapse>
    </Box>
  );
}
