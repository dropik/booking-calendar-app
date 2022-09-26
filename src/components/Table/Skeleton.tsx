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
        <SkeletonBase sx={{ fontSize: theme.typography.headlineMedium.fontSize }} width="10rem" />
      </Box>
      <Stack sx={{ borderBottom: `1px solid ${theme.palette.outline.light}` }}>
        {rows.map((row) => (
          <Stack key={row} direction="row">
            <Stack sx={{
              borderRight: `1px solid ${theme.palette.outline.light}`,
              justifyContent: "center",
              alignItems: "center",
              flexBasis: "5.5rem",
              pr: "1rem",
              pl: "1rem"
            }}>
              <SkeletonBase sx={{ fontSize: theme.typography.labelLarge.fontSize }} width="1rem" />
              <SkeletonBase sx={{ fontSize: theme.typography.bodySmall.fontSize }} width="4rem" />
            </Stack>
            <Box sx={{
              flexGrow: 1,
              ...(row === 0 && {
                pt: "0.25rem"
              }),
              ...(row === 4 && {
                pb: "0.25rem"
              })
            }}>
              <SkeletonBase variant="rectangular" height="5.5rem" />
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
