import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { deleteFloorAsync, Floor as FloorDTO, putFloorAsync } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editFloor, deleteFloor, Floor as FloorData } from "../../redux/floorsSlice";
import { show as showMessage } from "../../redux/snackbarMessageSlice";
import { deleteRooms as deleteRoomsForTiles } from "../../redux/tilesSlice";
import { deleteRooms } from "../../redux/roomsSlice";

import M3FilledButton from "../m3/M3FilledButton";
import M3IconButton from "../m3/M3IconButton";
import { SurfaceTint } from "../m3/Tints";
import Room from "./Room";
import M3Dialog from "../m3/M3Dialog";
import M3TextButton from "../m3/M3TextButton";

type FloorProps = {
  id: string,
  floor: FloorData
};

export default function Floor({ id, floor }: FloorProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<"idle" | "edit" | "remove">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(floor.name);
  const tilesHaveChanges = useAppSelector((state) => Object.keys(state.tiles.changesMap).length > 0);

  const floorName = `${floor.name[0].toLocaleUpperCase()}${floor.name.slice(1)}`;
  const validated = name !== "";
  const openRemoveDialog = state === "remove";

  function startEdit(): void {
    setState("edit");
    setName(floor.name);
  }

  function closeRemoveDialog(): void {
    setState("idle");
  }

  function edit(): void {
    async function putAsync(): Promise<void> {
      try {
        const newFloor: FloorDTO = { id, name };
        await putFloorAsync(newFloor);
        dispatch(editFloor(newFloor));
      } catch (error) {
        dispatch(showMessage({ type: "error" }));
      } finally {
        setState("idle");
        setIsLoading(false);
      }
    }

    if (validated) {
      setIsLoading(true);
      putAsync();
    }
  }

  function remove(): void {
    async function deleteAsync(): Promise<void> {
      try {
        await deleteFloorAsync(id);
        dispatch(deleteRoomsForTiles(floor.roomIds));
        dispatch(deleteRooms({ ids: floor.roomIds }));
        dispatch(deleteFloor(id));
      } catch (error) {
        dispatch(showMessage({ type: "error" }));
      } finally {
        setIsLoading(false);
      }
    }

    if (!tilesHaveChanges) {
      setIsLoading(true);
      deleteAsync();
    } else {
      dispatch(showMessage({ type: "error", message: "Ci sono le modifiche nel calendario non salvate!" }));
    }
  }

  return (
    <Stack>
      <Paper elevation={1} sx={{
        p: "1rem",
        position: "relative",
        borderRadius: "0.75rem",
        minHeight: "8rem",
        boxSizing: "border-box"
      }}>
        {state !== "edit" ? (
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="headlineLarge">{floorName}</Typography>
              <Stack direction="row" justifyContent="space-between">
                <M3IconButton onClick={startEdit}><EditOutlinedIcon /></M3IconButton>
                <M3IconButton onClick={() => setState("remove")}><DeleteOutlineOutlinedIcon /></M3IconButton>
              </Stack>
            </Stack>
            <Stack direction="row">
              <M3FilledButton>Crea camera</M3FilledButton>
            </Stack>
          </Stack>
        ): (
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Nome"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  edit();
                }
              }}
              sx={{ maxWidth: "30rem", flexGrow: 1 }}
              error={!validated}
              helperText={validated ? undefined : "Il nome non può essere vuoto."}
            />
            {isLoading ?
              <CircularProgress /> : (
                <Stack direction="row">
                  <M3IconButton onClick={edit}><CheckOutlinedIcon /></M3IconButton>
                  <M3IconButton onClick={() => setState("idle")}><CloseOutlinedIcon /></M3IconButton>
                </Stack>
              )}
          </Stack>
        )}
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface1
        }} />
      </Paper>
      <Stack>
        {floor.roomIds.map((roomId) => <Room key={roomId} id={roomId} />)}
      </Stack>
      <M3Dialog open={openRemoveDialog} onClose={closeRemoveDialog} heightRem={16.25}>
        <Stack spacing={3} sx={{ p: "1.5rem" }}>
          <Stack spacing={2} alignItems="center">
            <DeleteOutlineOutlinedIcon />
            <Typography variant="headlineSmall">Rimuovere il piano?</Typography>
            <Typography variant="bodyMedium" sx={{ display: "block", width: "100%", textAlign: "left" }}>
              Verranno rimosse anche tutte le stanze appartenenti a questo piano.
              Tutte le prenotazioni assegnate a qualsiasi stanza di questo piano rimarranno non assegnati a nessuna stanza.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            {isLoading ?
              <CircularProgress /> :
              (<>
                <M3TextButton onClick={closeRemoveDialog}>Cancella</M3TextButton>
                <M3TextButton onClick={remove}>OK</M3TextButton>
              </>)}
          </Stack>
        </Stack>
      </M3Dialog>
    </Stack>
  );
}
