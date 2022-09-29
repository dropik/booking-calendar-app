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
import { useAppDispatch } from "../../redux/hooks";
import { editFloor, deleteFloor, Floor as FloorData } from "../../redux/floorsSlice";
import { show as showMessage } from "../../redux/snackbarMessageSlice";
import { deleteRooms as deleteRoomsForTiles } from "../../redux/tilesSlice";
import { deleteRooms } from "../../redux/roomsSlice";

import M3FilledButton from "../m3/M3FilledButton";
import M3IconButton from "../m3/M3IconButton";
import { SurfaceTint } from "../m3/Tints";
import Room from "./Room";

type FloorProps = {
  id: string,
  floor: FloorData
};

export default function Floor({ id, floor }: FloorProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<"idle" | "edit">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(floor.name);

  const floorName = `${floor.name[0].toLocaleUpperCase()}${floor.name.slice(1)}`;
  const validated = name !== "";

  function startEdit(): void {
    setState("edit");
    setName(floor.name);
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

    setIsLoading(true);
    deleteAsync();
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
        {state === "idle" ? (
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="headlineLarge">{floorName}</Typography>
              {isLoading ? <CircularProgress /> : (
                <Stack direction="row" justifyContent="space-between">
                  <M3IconButton onClick={startEdit}><EditOutlinedIcon /></M3IconButton>
                  <M3IconButton onClick={remove}><DeleteOutlineOutlinedIcon /></M3IconButton>
                </Stack>
              )}
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
    </Stack>
  );
}
