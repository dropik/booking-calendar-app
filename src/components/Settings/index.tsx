import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppDispatch, useAppSelector, useFloors } from "../../redux/hooks";
import { fetchAsync as fetchFloorsAsync } from "../../redux/floorsSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import CreateFloorDialog from "./CreateFloorDialog";
import Skeleton from "./Skeleton";
import { SurfaceTint } from "../m3/Tints";
import M3FilledButton from "../m3/M3FilledButton";

export default function Settings(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const floors = useFloors();
  const floorsReady = useAppSelector((state) => state.floors.status === "idle");

  const floorIds = Object.keys(floors);

  useEffect(() => {
    dispatch(fetchFloorsAsync());
  }, [dispatch]);

  return (
    <DrawerAdjacent>
      <Stack spacing={2} sx={{ pr: "1rem", pb: "1rem" }}>
        <Typography variant="displayLarge" sx={{ pt: "4rem", pl: "1rem" }}>Piani</Typography>
        <Stack spacing={3}>
          {floorsReady ?
            floorIds.map((floorId) => {
              const floor = floors[floorId];
              const floorName = `${floor.name[0].toLocaleUpperCase()}${floor.name.slice(1)}`;
              const roomIds = Object.keys(floor.rooms);

              return (
                <Stack key={floorId}>
                  <Paper elevation={1} sx={{ p: "1rem", position: "relative", borderRadius: "0.75rem" }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="headlineLarge">{floorName}</Typography>
                        <Stack direction="row" justifyContent="space-between">
                          <M3IconButton><EditOutlinedIcon /></M3IconButton>
                          <M3IconButton><DeleteOutlineOutlinedIcon /></M3IconButton>
                        </Stack>
                      </Stack>
                      <Stack direction="row">
                        <M3FilledButton>Crea camera</M3FilledButton>
                      </Stack>
                    </Stack>
                    <SurfaceTint sx={{
                      backgroundColor: theme.palette.primary.light,
                      opacity: theme.opacities.surface1
                    }} />
                  </Paper>
                  <Stack>
                    {roomIds.map((roomId) => {
                      const room = floor.rooms[roomId];
                      const roomType = `${room.type[0].toLocaleUpperCase()}${room.type.slice(1)}`;

                      return (
                        <Stack key={roomId} direction="row" sx={{
                          borderBottom: `1px solid ${theme.palette.outline.light}`,
                          p: "1rem",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}>
                          <Stack direction="row" alignItems="center">
                            <Stack direction="row" sx={{ flexBasis: "10rem", flexShrink: 0 }}>
                              <Typography variant="titleLarge">{`Camera ${room.number}`}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                              <M3IconButton sx={{
                                borderRadius: "1.25rem",
                                border: `1px solid ${theme.palette.outline.light}`
                              }}>
                                <EditOutlinedIcon />
                              </M3IconButton>
                              <M3IconButton sx={{
                                borderRadius: "1.25rem",
                                border: `1px solid ${theme.palette.outline.light}`
                              }}>
                                <DeleteOutlineOutlinedIcon />
                              </M3IconButton>
                            </Stack>
                          </Stack>
                          <Stack direction="row" sx={{
                            borderRadius: "0.5rem",
                            border: `1px solid ${theme.palette.outline.light}`,
                            height: "2rem",
                            boxSizing: "border-box",
                            alignItems: "center",
                            pl: "1rem",
                            pr: "1rem"
                          }}>
                            <Typography variant="labelLarge">{roomType}</Typography>
                          </Stack>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              );
            }) : <Skeleton />}
        </Stack>
      </Stack>
      <CreateFloorDialog />
    </DrawerAdjacent>
  );
}
