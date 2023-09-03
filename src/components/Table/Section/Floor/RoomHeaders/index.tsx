import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import Header from "./Header";
import { Floor } from "../../../../../redux/floorsSlice";
import { useFloorRoomIds } from "../../../../../redux/hooks";

type RoomHeadersProps = {
  floor: Floor,
};

export default function RoomHeaders({ floor }: RoomHeadersProps): JSX.Element {
  const theme = useTheme();
  const roomIds = useFloorRoomIds(floor.id);

  return (
    <Stack sx={{
      borderRight: `1px solid ${theme.palette.outline.light}`,
    }}>
      {roomIds.map((roomId, index) => (
        <Header key={roomId} roomId={roomId} isFirst={index === 0} isLast={index === roomIds.length - 1} />
      ))}
    </Stack>
  );
}
