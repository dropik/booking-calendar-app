import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import React from "react";
import M3Skeleton from "../m3/M3Skeleton";

export default function Skeleton(): JSX.Element {
  const theme = useTheme();
  const bookings = [0, 1, 2, 3];

  return (
    <>
      {bookings.map((booking) => (
        <Stack key={booking} direction="row" sx={{ pr: "1rem", pl: "1rem", height: "4.75rem" }}>
          <Box sx={{ flexBasis: "4rem", pr: "1rem", pt: "0.375rem" }}>
            <M3Skeleton variant="circular" width="4rem" height="4rem" />
          </Box>
          <Stack sx={{ flexGrow: 1, justifyContent: "center" }}>
            <M3Skeleton sx={{ fontSize: theme.typography.titleMedium.fontSize }} width="5rem" />
            <M3Skeleton sx={{ fontSize: theme.typography.bodySmall.fontSize }} width="10rem" />
          </Stack>
          <Box sx={{ flexShrink: 1, textAlign: "right", pt: "1rem" }}>
            <M3Skeleton sx={{ fontSize: theme.typography.bodySmall.fontSize }} width="3rem" />
          </Box>
        </Stack>
      ))}
    </>
  );
}
