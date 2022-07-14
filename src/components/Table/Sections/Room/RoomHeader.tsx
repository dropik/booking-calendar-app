import React from "react";
import Typography from "@mui/material/Typography";

import { RoomData } from "../../../../redux/hotelSlice";
import Header from "../Header";

type Props = {
  room: RoomData
}

export default function RoomHeader({ room }: Props): JSX.Element {
  const significantRoomType = room.type.replace("Camera ", "").replace("camera ", "");

  return (
    <Header>
      <Typography variant="labelLarge">{room.number}</Typography>
      <Typography
        sx={{
          textAlign: "center",
          overflowWrap: "anywhere"
        }}
        variant="bodySmall"
      >
        {significantRoomType}
      </Typography>
    </Header>
  );
}
