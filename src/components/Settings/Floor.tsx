/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { deleteFloorAsync, Floor as FloorDTO, postRoomAsync, putFloorAsync } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editFloor, deleteFloor, createRoom, Floor as FloorData } from "../../redux/floorsSlice";
import { show as showMessage } from "../../redux/snackbarMessageSlice";
import { deleteRooms as deleteRoomsForTiles, createRoom as createRoomForTiles } from "../../redux/tilesSlice";
import { setRoom, deleteRooms } from "../../redux/roomsSlice";

import M3FilledButton from "../m3/M3FilledButton";
import M3IconButton from "../m3/M3IconButton";
import { SurfaceTint } from "../m3/Tints";
import Room from "./Room";
import M3Dialog from "../m3/M3Dialog";
import M3TextButton from "../m3/M3TextButton";
import { Utils } from "../../utils";

type FloorProps = {
  id: number,
  floor: FloorData
};

export default function Floor({ id, floor }: FloorProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<"idle" | "edit" | "remove" | "createRoom">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(floor.name);
  const tilesHaveChanges = useAppSelector((state) => Object.keys(state.tiles.roomChanges).length > 0);
  const roomTypes = useAppSelector((state) => Object.keys(state.roomTypes.data));
  const [roomNumber, setRoomNumber] = useState("");
  const [isRoomNumberValid, setIsRoomNumberValid] = useState(true);
  const [roomType, setRoomType] = useState("");
  const [isRoomTypeValid, setIsRoomTypeValid] = useState(true);

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
        const newFloor: FloorDTO = { id, name, rooms: [] };
        await putFloorAsync(newFloor);
        dispatch(editFloor(newFloor));
      } catch (error: any) {
        dispatch(showMessage({ type: "error", message: error?.message }));
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
        setState("idle");
      } catch (error: any) {
        dispatch(showMessage({ type: "error", message: error?.message }));
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

  function addRoom(): void {
    async function addAsync(): Promise<void> {
      try {
        const response = await postRoomAsync({ floorId: id, number: roomNumber, type: roomType });
        dispatch(setRoom({ id: response.id, room: { number: roomNumber, type: roomType } }));
        dispatch(createRoom({ floorId: id, roomId: response.id }));
        dispatch(createRoomForTiles(response.id));
        setState("idle");
      } catch(error: any) {
        dispatch(showMessage({ type: "error", message: error?.message }));
      } finally {
        setIsLoading(false);
      }
    }

    let hasErrors = false;
    if (roomNumber === "") {
      setIsRoomNumberValid(false);
      hasErrors = true;
    }
    if (roomType === "") {
      setIsRoomTypeValid(false);
      hasErrors = true;
    }

    if (!hasErrors) {
      setIsLoading(true);
      addAsync();
    }
  }

  return (
    <Stack>
      <Paper elevation={1} sx={{
        p: "1rem",
        position: "relative",
        borderRadius: "0.75rem",
        minHeight: "9rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column"
      }}>
        {state !== "edit" ? (
          <Stack justifyContent="space-between" sx={{ height: "100%", flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="headlineLarge">{Utils.evaluateEntitiesInString(floorName)}</Typography>
              {state !== "createRoom" ? (
                <Stack direction="row" justifyContent="space-between">
                  <M3IconButton onClick={startEdit}><EditOutlinedIcon /></M3IconButton>
                  <M3IconButton onClick={() => setState("remove")}><DeleteOutlineOutlinedIcon /></M3IconButton>
                </Stack>
              ) : null}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="top">
              {state !== "createRoom" ?
                <M3FilledButton onClick={() => setState("createRoom")}>Crea camera</M3FilledButton> :
                (<>
                  <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
                    <TextField
                      label="Numero"
                      error={!isRoomNumberValid}
                      helperText={isRoomNumberValid ? undefined : "Il numero deve essere non vuoto"}
                      onChange={(event) => {
                        const newValue = event.target.value;
                        setRoomNumber(newValue);
                        if (newValue === "") {
                          setIsRoomNumberValid(false);
                        } else {
                          setIsRoomNumberValid(true);
                        }
                      }}
                    />
                    <FormControl fullWidth>
                      <InputLabel error={!isRoomTypeValid} id="newRoomTypeLabel">Tipologia</InputLabel>
                      <Select
                        label="Tipologia"
                        labelId="newRoomTypeLabel"
                        value={roomType}
                        onChange={(event) => {
                          setRoomType(event.target.value);
                          setIsRoomTypeValid(true);
                        }}
                        error={!isRoomTypeValid}
                        MenuProps={{
                          PaperProps: {
                            elevation: 2,
                            sx: {
                              borderRadius: "0.25rem",
                              "::after": {
                                content: "' '",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 999,
                                pointerEvents: "none",
                                backgroundColor: theme.palette.primary.light,
                                opacity: theme.opacities.surface2
                              }
                            }
                          }
                        }}
                      >
                        {roomTypes.map((roomTypeId) => (
                          <MenuItem key={roomTypeId} value={roomTypeId} sx={{ height: "3rem" }}>
                            {Utils.evaluateEntitiesInString(`${roomTypeId[0].toLocaleUpperCase()}${roomTypeId.slice(1)}`)}
                          </MenuItem>
                        ))}
                      </Select>
                      {!isRoomTypeValid ? <FormHelperText error>Tipologia della stanza è obbligatoria</FormHelperText> : null}
                    </FormControl>
                  </Stack>
                  {isLoading ?
                    <CircularProgress /> : (
                      <Stack direction="row" spacing={1} sx={{ pt: "0.5rem" }}>
                        <M3FilledButton iconOnly onClick={addRoom}><CheckOutlinedIcon sx={{ verticalAlign: "bottom" }} /></M3FilledButton>
                        <M3IconButton onClick={() => setState("idle")}><CloseOutlinedIcon /></M3IconButton>
                      </Stack>
                    )
                  }
                </>)}
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
                <Stack direction="row" spacing={1}>
                  <M3FilledButton iconOnly onClick={edit}><CheckOutlinedIcon sx={{ verticalAlign: "bottom" }} /></M3FilledButton>
                  <M3IconButton onClick={() => setState("idle")}><CloseOutlinedIcon /></M3IconButton>
                </Stack>
              )
            }
          </Stack>
        )}
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface1
        }} />
      </Paper>
      <Stack>
        {floor.roomIds.map((roomId) => <Room key={roomId} id={roomId} floorId={id} />)}
      </Stack>
      <M3Dialog open={openRemoveDialog} onClose={closeRemoveDialog} heightRem={16.25}>
        <Stack spacing={3} sx={{ p: "1.5rem" }}>
          <Stack spacing={2} alignItems="center">
            <DeleteOutlineOutlinedIcon />
            <Typography variant="headlineSmall">Rimuovere il piano?</Typography>
            <Typography variant="bodyMedium" sx={{ display: "block", width: "100%", textAlign: "left" }}>
              Verranno rimosse anche tutte le stanze appartenenti a questo piano.
              Tutte le prenotazioni assegnate a qualsiasi stanza di questo piano diventeranno non assegnati a nessuna stanza.
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            {isLoading ?
              <CircularProgress /> :
              (<>
                <M3TextButton onClick={closeRemoveDialog}>No</M3TextButton>
                <M3TextButton onClick={remove}>Sì</M3TextButton>
              </>)}
          </Stack>
        </Stack>
      </M3Dialog>
    </Stack>
  );
}
