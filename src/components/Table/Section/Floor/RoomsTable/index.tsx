import React from "react";
import Stack from "@mui/material/Stack";

import { Floor } from "../../../../../redux/floorsSlice";

import Room from "./Room";

type RoomTableProps = {
  floor: Floor,
};

export default function RoomTable({ floor }: RoomTableProps): JSX.Element {
  return (
    <Stack sx={{
      flexGrow: 1,
      maxWidth: "calc(100% - 7.5rem - 1px)",
      overflowX: "scroll",
    }}>
      {floor.roomIds.map((roomId, index) => (
        <Room key={roomId} isFirst={index === 0} isLast={index === floor.roomIds.length - 1} roomId={roomId} />
      ))}
    </Stack>
  );
}
