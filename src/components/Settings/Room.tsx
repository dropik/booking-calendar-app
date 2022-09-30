import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRoom } from "../../redux/roomsSlice";
import { show as showMessage } from "../../redux/snackbarMessageSlice";

import M3IconButton from "../m3/M3IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import M3FilledButton from "../m3/M3FilledButton";
import { putRoomAsync } from "../../api";

type RoomProps = {
  id: string,
  floorId: string
};

export default function Room({ id, floorId }: RoomProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.rooms.data[id]);
  const [state, setState] = useState<"idle" | "edit">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [numberField, setNumberField] = useState(room.number);
  const [roomTypeField, setRoomTypeField] = useState(room.type);
  const roomTypes = useAppSelector((state) => Object.keys(state.roomTypes.data));

  const roomType = `${room.type[0].toLocaleUpperCase()}${room.type.slice(1)}`;
  const isValid = numberField !== "";

  function edit(): void {
    async function putAsync(): Promise<void> {
      try {
        await putRoomAsync({ id, floorId, number: numberField, type: roomTypeField });
        dispatch(setRoom({ id, room: { number: numberField, type: roomTypeField } }));
        setState("idle");
      } catch (error) {
        dispatch(showMessage({ type: "error" }));
      } finally {
        setIsLoading(true);
      }
    }

    if (isValid) {
      setIsLoading(true);
      putAsync();
    }
  }

  return (
    <Stack direction="row" sx={{
      borderBottom: `1px solid ${theme.palette.outline.light}`,
      p: "1rem",
      justifyContent: "space-between",
      minHeight: "calc(5.5rem + 1px)",
      boxSizing: "border-box"
    }}>
      {state === "idle" ? (
        <>
          <Stack direction="row" alignItems="center">
            <Stack direction="row" sx={{ flexBasis: "10rem", flexShrink: 0 }}>
              <Typography variant="titleLarge">{`Camera ${room.number}`}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <M3IconButton sx={{
                borderRadius: "1.25rem",
                border: `1px solid ${theme.palette.outline.light}`
              }} onClick={() => setState("edit")}>
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
            <Typography variant="bodySmall">{roomType}</Typography>
          </Stack>
        </>
      ) : (
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            <TextField
              label="Numero"
              value={numberField}
              onChange={(event) => setNumberField(event.target.value)}
              error={!isValid}
              helperText={isValid ? undefined : "Il numero non può essere vuoto"}
            />
            <FormControl fullWidth>
              <InputLabel id="newRoomTypeLabel">Tipologia</InputLabel>
              <Select
                label="Tipologia"
                labelId="newRoomTypeLabel"
                value={roomTypeField}
                onChange={(event) => setRoomTypeField(event.target.value)}
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
                    {`${roomTypeId[0].toLocaleUpperCase()}${roomTypeId.slice(1)}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {isLoading ?
            <CircularProgress /> : (
              <Stack direction="row" spacing={1} sx={{ pt: "0.5rem" }}>
                <M3FilledButton iconOnly onClick={edit}><CheckOutlinedIcon sx={{ verticalAlign: "bottom" }} /></M3FilledButton>
                <M3IconButton onClick={() => setState("idle")}><CloseOutlinedIcon /></M3IconButton>
              </Stack>
            )
          }
        </Stack>
      )}
    </Stack>
  );
}
