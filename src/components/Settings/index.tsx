import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { useAppSelector, useFloors } from "../../redux/hooks";
import DrawerAdjacent from "../m3/DrawerAdjacent";
import M3IconButton from "../m3/M3IconButton";
import { SurfaceTint } from "../m3/Tints";
import M3Fab from "../m3/M3Fab";
import M3TextButton from "../m3/M3TextButton";
import Box from "@mui/material/Box";

export default function Settings(): JSX.Element {
  const theme = useTheme();
  const floors = useFloors();
  const roomTypes = useAppSelector((state) => state.roomTypes.data);
  const [creatingState, setCreatingState] = useState<"idle" | "creating" | "loading">("idle");

  const floorIds = Object.keys(floors);
  const openDialog = creatingState !== "idle";

  function closeDialog(): void {
    setCreatingState("idle");
  }

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
      <M3Fab onClick={() => setCreatingState("creating")} sx={{
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
      <Dialog keepMounted open={openDialog} onClose={closeDialog} PaperProps={{
        elevation: 0,
        sx: {
          height: "calc(100vh - 4rem)",
          backgroundColor: "transparent",
          overflow: "visible"
        }
      }}>
        <Paper elevation={3} sx={{
          borderRadius: "1.75rem",
          minWidth: "17.5rem",
          maxWidth: "35rem",
          position: "relative",
          mt: "calc(50vh - 11.125rem)"
        }}>
          <Collapse
            in={openDialog}
            easing={theme.transitions.easing.fastOutSlowIn}
          >
            <Stack spacing={3} sx={{ p: "1.5rem" }}>
              <Stack spacing={2} alignItems="center">
                <AddOutlinedIcon />
                <Typography variant="headlineSmall">Crea piano</Typography>
                <Typography variant="bodyMedium" sx={{ display: "block", width: "100%", textAlign: "left" }}>
                  Crea un nuovo piano vuoto con seguente nome:
                </Typography>
                <TextField label="Nome" sx={{ minWidth: "20rem" }} />
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <M3TextButton onClick={closeDialog}>Cancella</M3TextButton>
                <M3TextButton>Crea</M3TextButton>
              </Stack>
            </Stack>
          </Collapse>
          <SurfaceTint sx={{
            backgroundColor: theme.palette.primary.light,
            opacity: theme.opacities.surface3
          }} />
        </Paper>
      </Dialog>
    </DrawerAdjacent>
  );
}
