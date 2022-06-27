import React from "react";
import Box from "@mui/material/Box";

import { FloorData } from "../../redux/hotelSlice";

import Rooms from "./Rooms";
import FloorHeader from "./FloorHeader";

type FloorProps = {
  data: FloorData
}

export default function Floor({ data }: FloorProps): JSX.Element {
  return (
    <Box>
      <FloorHeader name={data.name} />
      <Rooms data={data.rooms} />
    </Box>
  );
}
