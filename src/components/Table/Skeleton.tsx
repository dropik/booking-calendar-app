import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SkeletonBase from "@mui/material/Skeleton";

export default function Skeleton(): JSX.Element {
  const theme = useTheme();
  const rows = [0, 1, 2, 3, 4];

  return (
    <Stack>
      <Box sx={{
        pl: "2rem",
        pr: "2rem",
        pt: "1rem",
        pb: "1rem",
        borderBottom: `1px solid ${theme.palette.outline.light}`
      }}>
        <SkeletonBase variant="rounded" sx={{ fontSize: theme.typography.headlineMedium.fontSize }} width="10rem" />
      </Box>
      <Stack sx={{ borderBottom: `1px solid ${theme.palette.outline.light}` }}>
        {rows.map((row) => (
          <Stack key={row} direction="row">
            <Stack spacing={1} sx={{
              borderRight: `1px solid ${theme.palette.outline.light}`,
              justifyContent: "center",
              alignItems: "center",
              flexBasis: "5.5rem",
              pr: "1rem",
              pl: "1rem"
            }}>
              <SkeletonBase variant="rounded" sx={{ fontSize: theme.typography.labelLarge.fontSize }} width="2rem" />
              <SkeletonBase variant="rounded" sx={{ fontSize: theme.typography.bodySmall.fontSize }} width="4rem" />
            </Stack>
            <SkeletonBase variant="rectangular" height="5.5rem" sx={{ flexGrow: 1 }} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
