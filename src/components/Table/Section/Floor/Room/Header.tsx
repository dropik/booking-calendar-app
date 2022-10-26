import React from "react";
import Typography from "@mui/material/Typography";

import { evaluateEntitiesInString } from "../../../../../utils";
import { Room } from "../../../../../redux/roomsSlice";

import RowHeader from "../../Row/Header";

type HeaderProps = {
  room: Room
}

export default function Header({ room }: HeaderProps): JSX.Element {
  const significantRoomType = room.type.replace("Camera ", "").replace("camera ", "");

  return (
    <RowHeader>
      <Typography variant="labelLarge">{room.number}</Typography>
      <Typography
        sx={{
          textAlign: "center",
          overflowWrap: "anywhere"
        }}
        variant="bodySmall"
      >
        {evaluateEntitiesInString(significantRoomType)}
      </Typography>
    </RowHeader>
  );
}
