import React from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import M3Skeleton from "../m3/M3Skeleton";

export default function Skeleton(): JSX.Element {
  const theme = useTheme();
  const emptyFloors = [0, 1];

  return (
    <>
      {emptyFloors.map((floor) => {
        const emptyRooms = [0, 1];

        return (
          <Paper key={floor} elevation={0} sx={{
            position: "relative",
            borderRadius: "0.75rem",
            overflow: "hidden",
            width: "100%",
            maxWidth: "35rem",
            p: "1rem",
            border: `1px solid ${theme.palette.outline.light}`,
            pb: "4rem"
          }}>
            <Stack spacing={2}>
              <Typography variant="headlineLarge"><M3Skeleton width="8rem" /></Typography>
              <Stack spacing={1}>
                {emptyRooms.map((room) => (
                  <Paper key={room} elevation={0} sx={{
                    position: "relative",
                    p: "1rem",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    backgroundColor: theme.palette.surfaceVariant.light,
                    color: theme.palette.onSurfaceVariant.light
                  }}>
                    <Stack>
                      <Typography variant="headlineSmall"><M3Skeleton width="1rem" /></Typography>
                      <Typography variant="labelLarge"><M3Skeleton width="10rem" /></Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Stack>
          </Paper>
        );
      })}
    </>
  );
}
