import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { useHotelData } from "../../redux/hooks";

import Floor from "./Section/Floor";
import NotAssigned from "./Section/NotAssigned";
import Skeleton from "./Skeleton";

export default function Sections(): JSX.Element {
  const theme = useTheme();
  const data = useHotelData().floors;

  return (
    <Stack spacing={0} sx={{
      color: theme.palette.onSurface.light
    }}>
      {data.length > 0 ? data.map((floor) => (
        <Floor key={floor.name} data={floor} />
      )) : <Skeleton />}
      <NotAssigned />
    </Stack>
  );
}
