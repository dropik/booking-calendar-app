import React from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { useAppSelector, useFloors } from "../../redux/hooks";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import { SurfaceTint } from "../m3/Tints";
import M3Fab from "../m3/M3Fab";

export default function Settings(): JSX.Element {
  const theme = useTheme();
  const floors = useFloors();
  const roomTypes = useAppSelector((state) => state.roomTypes.data);
  const floorIds = Object.keys(floors);

  return (
    <DrawerAdjacent>
      <Stack spacing={2} sx={{ pr: "1rem", pb: "1rem" }}>
        <Typography variant="displayMedium" sx={{ pt: "4rem", pl: "1rem" }}>Piani</Typography>
        <Stack spacing={1}>
          {floorIds.map((floorId) => {
            const floor = floors[floorId];
            const floorName = `${floor.name[0].toLocaleUpperCase()}${floor.name.slice(1)}`;
            const roomIds = Object.keys(floor.rooms);

            return (
              <Paper key={floorId} elevation={0} sx={{
                position: "relative",
                borderRadius: "0.75rem",
                overflow: "hidden",
                maxWidth: "35rem",
                p: "1rem",
                border: `1px solid ${theme.palette.outline.light}`
              }}>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                      <Typography variant="headlineLarge">{floorName}</Typography>
                      <M3IconButton><EditOutlinedIcon /></M3IconButton>
                    </Stack>
                    <M3IconButton><DeleteOutlineOutlinedIcon /></M3IconButton>
                  </Stack>
                  <Stack spacing={1}>
                    {roomIds.map((roomId) => {
                      const room = floor.rooms[roomId];
                      const roomType = `${room.type[0].toLocaleUpperCase()}${room.type.slice(1)}`;

                      return (
                        <Paper key={roomId} elevation={0} sx={{
                          position: "relative",
                          p: "1rem",
                          borderRadius: "0.75rem",
                          overflow: "hidden",
                          backgroundColor: theme.palette.surfaceVariant.light,
                          color: theme.palette.onSurfaceVariant.light
                        }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack sx={{ flexGrow: 1 }}>
                              <Typography variant="headlineSmall">{`Camera ${room.number}`}</Typography>
                              <Typography variant="labelLarge">{roomType}</Typography>
                            </Stack>
                            <Stack direction="row">
                              <M3IconButton><EditOutlinedIcon /></M3IconButton>
                              <M3IconButton><DeleteOutlineOutlinedIcon /></M3IconButton>
                            </Stack>
                          </Stack>
                        </Paper>
                      );
                    })}
                    <M3IconButton><AddCircleOutlineOutlinedIcon /></M3IconButton>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
      <M3Fab sx={{
        position: "fixed",
        right: 0,
        bottom: 0,
        width: "auto",
        minWidth: "5rem"
      }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ p: "1rem" }}>
          <AddOutlinedIcon />
          <Typography variant="labelLarge">Crea</Typography>
        </Stack>
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface3
        }} />
      </M3Fab>
    </DrawerAdjacent>
  );
}
