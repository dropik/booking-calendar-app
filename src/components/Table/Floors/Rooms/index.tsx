import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { RoomData } from "../../../../redux/hotelSlice";

import Room from "./Room";

type Props = {
  data: RoomData[]
}

export default function Rooms({ data }: Props): JSX.Element {
  const theme = useTheme();

  return (
    <Stack spacing={0} sx={{
      borderBottom: `1px solid ${theme.palette.outline.light}`
    }}>
      {
        data.map((room, index) => (
          <Room key={room.number} data={room} isLast={index === data.length - 1} />
        ))
      }
    </Stack>
  );
}
