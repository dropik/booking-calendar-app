import React from "react";
import Stack from "@mui/material/Stack";
import { SurfaceTint } from "../m3/Tints";
import { useTheme } from "@mui/material/styles";

export default function BookingDetails(): JSX.Element {
  const theme = useTheme();

  return (
    <Stack spacing={2} sx={{
      position: "relative",
      flexGrow: 1
    }}>
      <SurfaceTint sx={{
        backgroundColor: theme.palette.primary.light,
        opacity: theme.opacities.surface1
      }} />
    </Stack>
  );
}
