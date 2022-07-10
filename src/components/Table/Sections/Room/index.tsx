import React from "react";
import Box from "@mui/material/Box";

import { RoomData } from "../../../../redux/hotelSlice";

import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";

type RoomProps = {
  data: RoomData,
  isLast: boolean
}

export default function Room({ data, isLast }: RoomProps): JSX.Element {
  return (
    <Box sx={{
      position: "relative"
    }}>
      <RoomHeader room={data} />
      <RoomBody isLast={isLast} roomNumber={data.number} />
    </Box>
  );
}
