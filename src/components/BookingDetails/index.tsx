import React from "react";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

export default function BookingDetails(): JSX.Element {
  const theme = useTheme();

  return (
    <Stack spacing={2} sx={{
      position: "relative",
      flexGrow: 1,
      backgroundColor: theme.palette.surfaceVariant.light,
      color: theme.palette.onSurfaceVariant.light
    }}>
      Ivan Petrov
    </Stack>
  );
}
