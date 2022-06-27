import React from "react";
import Box from "@mui/material/Box";

import { RoomData } from "../../../../redux/hotelSlice";

import RowHeader from "./RoomHeader";
import RowBody from "./RowBody";

type RoomProps = {
  data: RoomData,
  isLast: boolean
}

export default function Room({ data, isLast }: RoomProps): JSX.Element {
  return (
    <Box sx={{
      position: "relative"
    }}>
      <RowHeader room={data} />
      <RowBody isLast={isLast} roomNumber={data.number} />
    </Box>
  );
}
