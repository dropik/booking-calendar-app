import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useAppDispatch, useAppSelector, useFloors } from "../../redux/hooks";
import { fetchAsync as fetchFloorsAsync } from "../../redux/floorsSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import CreateFloorDialog from "./CreateFloorDialog";
import Skeleton from "./Skeleton";

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
        <Typography variant="displayMedium" sx={{ pt: "4rem", pl: "1rem" }}>Piani</Typography>
        <Stack spacing={1}>
          {floorsReady ?
            floorIds.map((floorId) => {
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
            }) : <Skeleton />}
        </Stack>
      </Stack>
      <CreateFloorDialog />
    </DrawerAdjacent>
  );
}
