import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import { useHotelData } from "../../../redux/hooks";

import Floor from "./Floor";
import NotAssigned from "./NotAssigned";

export default function Floors(): JSX.Element {
  const theme = useTheme();
  const data = useHotelData().floors;

  return (
    <Stack spacing={0} sx={{
      color: theme.palette.onSurface.light
    }}>
      {
        data.map((floor) => (
          <Floor key={floor.name} data={floor} />
        ))
      }
      <NotAssigned />
    </Stack>
  );
}
