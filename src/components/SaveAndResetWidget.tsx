import React, { useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";

import * as Api from "../api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as TilesSlice from "../redux/tilesSlice";
import * as ConnectionErrorSlice from "../redux/connectionErrorSlice";

import M3Card from "./m3/M3Card";
import M3TextButton from "./m3/M3TextButton";
import M3Fab from "./m3/M3Fab";
import M3Alert from "./m3/M3Alert";
import M3Snackbar from "./m3/M3Snackbar";

type Status = "idle" | "loading" | "fulfilled";

export default function SaveAndResetWidget(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasChanges = useAppSelector((state) => Object.keys(state.tiles.changesMap).length > 0);
  const changes = useAppSelector((state) => state.tiles.changesMap);
  const [status, setStatus] = useState<Status>("idle");

  function saveChanges() {
    async function launchSaveAsync(): Promise<void> {
      try {
        await Api.postChangesAsync(changes);
        dispatch(TilesSlice.saveChanges());
        setStatus("fulfilled");
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
        setStatus("idle");
      }
    }
    launchSaveAsync();
    setStatus("loading");
  }

  function resetChanges() {
    dispatch(TilesSlice.undoChanges());
  }

  function resetIdle() {
    setStatus("idle");
  }

  const openActions = status === "idle" && hasChanges;
  const openLoading = status === "loading";
  const openSuccess = status === "fulfilled";

  return (
    <>
      <ActionButtons open={openActions} onSave={saveChanges} onReset={resetChanges} />
      <SavingNotification open={openLoading} />
      <SavedNotification open={openSuccess} onClose={resetIdle} />
    </>
  );
}

type ActionButtonsProps = {
  open: boolean,
  onSave: () => void,
  onReset: () => void
}

function ActionButtons({ open, onSave, onReset }: ActionButtonsProps): JSX.Element {
  return (
    <M3Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ pr: "1rem", pb: "1rem" }}
    >
      <M3Card borderRadius="1.75rem">
        <Stack spacing={1} direction="row" alignItems="center">
          <M3Fab size="small" dark elevation="none" onClick={onSave} sx={{ m: 0 }}>
            <SaveIcon />
          </M3Fab>
          <M3TextButton
            iconOnly
            onClick={onReset}
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

type SavingNotificationProps = {
  open: boolean
};

function SavingNotification({ open }: SavingNotificationProps): JSX.Element {
  return (
    <M3Snackbar open={open}>
      <M3Alert severity="info">Salviamo modifiche...</M3Alert>
    </M3Snackbar>
  );
}

type SavedNotificationProps = {
  open: boolean,
  onClose: () => void
};

function SavedNotification({ open, onClose }: SavedNotificationProps): JSX.Element {
  return (
    <M3Snackbar open={open} onClose={onClose} autoHideDuration={1000}>
      <M3Alert severity="success">Modifiche salvate!</M3Alert>
    </M3Snackbar>
  );
}
