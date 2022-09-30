import React from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import M3Skeleton from "../m3/M3Skeleton";
import { SurfaceTint } from "../m3/Tints";

export default function Skeleton(): JSX.Element {
  const theme = useTheme();
  const emptyFloors = [0, 1];

  return (
    <>
      {emptyFloors.map((floor) => {
        const emptyRooms = [0, 1];

        return (
          <Stack key={floor}>
            <Paper elevation={1} sx={{
              p: "1rem",
              position: "relative",
              borderRadius: "0.75rem",
              boxSizing: "border-box",
              height: "8rem"
            }}>
              <Typography variant="headlineLarge"><M3Skeleton width="8rem" /></Typography>
              <SurfaceTint sx={{
                backgroundColor: theme.palette.primary.light,
                opacity: theme.opacities.surface1
              }} />
            </Paper>
            <Stack>
              {emptyRooms.map((room) => (
                <Stack key={room} sx={{
                  borderBottom: `1px solid ${theme.palette.outline.light}`,
                  p: "1rem",
                  height: "4.5rem",
                  boxSizing: "border-box"
                }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="titleLarge"><M3Skeleton width="6rem" /></Typography>
                    <Typography variant="labelLarge"><M3Skeleton width="10rem" /></Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        );
      })}
    </>
  );
}
