import React from "react";
import Typography from "@mui/material/Typography";

import { evaluateEntitiesInString } from "../../../../../utils";
import { useAppSelector } from "../../../../../redux/hooks";

import RowHeader from "../../Row/Header";

type HeaderProps = {
  roomId: number,
  isFirst: boolean,
  isLast: boolean,
}

export default function Header({ roomId, isFirst, isLast }: HeaderProps): JSX.Element {
  const room = useAppSelector(state => state.rooms.data[roomId]);
  const significantRoomType = room.type.replace("Camera ", "").replace("camera ", "");

  return (
    <RowHeader isFirst={isFirst} isLast={isLast}>
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
