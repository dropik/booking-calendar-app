import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import SkeletonBase from "@mui/material/Skeleton";

export default function Skeleton(): JSX.Element {
  const theme = useTheme();
  const clients = [0, 1];

  return (
    <>
      {clients.map((client) => (
        <Stack key={client}>
          <SkeletonBase sx={{ fontSize: theme.typography.titleMedium.fontSize }} width="6rem" />
          <SkeletonBase sx={{ fontSize: theme.typography.bodySmall.fontSize }} width="12rem" />
        </Stack>
      ))}
    </>
  );
}
