import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";

import { FloorData } from "../../../redux/hotelSlice";

import SectionBody from "./SectionBody";
import SectionHeader from "./SectionHeader";
import Room from "./Room";

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
      <SectionHeader name={data.name} collapseCallback={() => setOpen(!open)} />
      <Collapse in={open} easing={theme.transitions.easing.fastOutSlowIn} timeout={theme.transitions.duration.long}>
        <SectionBody>
          {
            data.rooms.map((room, index) => (
              <Room key={room.number} data={room} isLast={index === data.rooms.length - 1} />
            ))
          }
        </SectionBody>
      </Collapse>
    </Box>
  );
}
