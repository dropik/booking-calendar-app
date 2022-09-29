import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useAppDispatch, useAppSelector, useFloors } from "../../redux/hooks";
import { fetchAsync as fetchFloorsAsync } from "../../redux/floorsSlice";
import { fetchAsync as fetchRoomsAsync } from "../../redux/roomsSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import CreateFloorDialog from "./CreateFloorDialog";
import Skeleton from "./Skeleton";
import Room from "./Room";
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

  useEffect(() => {
    dispatch(fetchRoomsAsync());
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
                    {floor.roomIds.map((roomId) => <Room key={roomId} id={roomId} />)}
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