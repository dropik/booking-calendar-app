import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import M3Skeleton from "../../m3/M3Skeleton";

export default function Skeleton(): JSX.Element {
  const theme = useTheme();
  const clients = [0, 1];

  return (
    <>
      {clients.map((client) => (
        <Stack key={client}>
          <M3Skeleton sx={{ fontSize: theme.typography.titleMedium.fontSize }} width="6rem" />
          <M3Skeleton sx={{ fontSize: theme.typography.bodySmall.fontSize }} width="12rem" />
        </Stack>
      ))}
    </>
  );
}
