import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";

import { ColorAssignments, RoomAssignments } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SaveAndResetWidgetContext } from ".";
import * as TilesSlice from "../../redux/tilesSlice";

import M3Snackbar from "../m3/M3Snackbar";
import M3Card from "../m3/M3Card";
import M3Fab from "../m3/M3Fab";
import M3TextButton from "../m3/M3TextButton";

export default function ActionButtons(): JSX.Element {
  const { status, postAssignments } = useContext(SaveAndResetWidgetContext);
  const dispatch = useAppDispatch();
  const hasRoomChanges = useAppSelector((state) => Object.keys(state.tiles.roomChanges).length > 0);
  const hasColorChanges = useAppSelector((state) => Object.keys(state.tiles.colorChanges).length > 0);
  const hasChanges = hasRoomChanges || hasColorChanges;
  const roomChanges = useAppSelector((state) => state.tiles.roomChanges);
  const colorChanges = useAppSelector((state) => state.tiles.colorChanges);

  const open = !status.isLoading && !status.isSuccess && hasChanges;

  function save() {
    if (hasChanges) {
      const roomAssignments: RoomAssignments = { };
      const roomChangesKeys = Object.keys(roomChanges);
      for (const changeKey of roomChangesKeys) {
        const change = roomChanges[changeKey];
        roomAssignments[changeKey] = change.newRoom !== undefined ? change.newRoom : null;
      }

      const colorAssignments: ColorAssignments = { };
      const colorChangesKeys = Object.keys(colorChanges);
      for (const changeKey of colorChangesKeys) {
        const change = colorChanges[changeKey];
        colorAssignments[changeKey] = change.newColor;
      }

      postAssignments({
        colors: colorAssignments,
        rooms: roomAssignments,
      });
    }
  }

  function reset() {
    dispatch(TilesSlice.undoChanges());
  }

  return (
    <M3Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ pr: "1rem", pb: "1rem" }}
    >
      <M3Card borderRadius="1.75rem">
        <Stack spacing={1} direction="row" alignItems="center">
          <M3Fab size="small" dark elevation="none" onClick={save} sx={{ m: 0 }}>
            <SaveIcon />
          </M3Fab>
          <M3TextButton
            iconOnly
            onClick={reset}
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              padding: 0,
              minWidth: "unset"
            }}
          >
            <RestoreIcon />
          </M3TextButton>
        </Stack>
      </M3Card>
    </M3Snackbar>
  );
}
