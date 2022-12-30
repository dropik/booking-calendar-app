import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import Header from "./Header";
import { Floor } from "../../../../../redux/floorsSlice";

type RoomHeadersProps = {
  floor: Floor,
};

export default function RoomHeaders({ floor }: RoomHeadersProps): JSX.Element {
  const theme = useTheme();

  return (
    <Stack sx={{
      borderRight: `1px solid ${theme.palette.outline.light}`,
    }}>
      {floor.roomIds.map((roomId, index) => (
        <Header key={roomId} roomId={roomId} isFirst={index === 0} isLast={index === floor.roomIds.length - 1} />
      ))}
    </Stack>
  );
}
