import React, { useRef, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import * as Api from "../api";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as TilesSlice from "../redux/tilesSlice";
import * as ConnectionErrorSlice from "../redux/connectionErrorSlice";

import SlideAndFade from "./m3/SlideAndFade";
import M3Card from "./m3/M3Card";
import M3TextButton from "./m3/M3TextButton";
import M3Fab from "./m3/M3Fab";

type Status = "idle" | "loading" | "fulfilled";

export default function SaveAndResetWidget(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasChanges = useAppSelector((state) => Object.keys(state.tiles.changesMap).length > 0);
  const changes = useAppSelector((state) => state.tiles.changesMap);
  const [status, setStatus] = useState<Status>("idle");
  const ref = useRef<HTMLElement | null>(null);

  function saveHandler() {
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
      <Box sx={{
        position: "fixed",
        pointerEvents: "none",
        bottom: "2.5rem",
        right: "3rem"
      }} ref={ref}></Box>
      <SlideAndFade in={openActions} container={ref.current} boxSx={{
        position: "fixed",
        bottom: "2.5rem",
        right: "3rem"
      }}>
        <M3Card borderRadius="1.75rem">
          <Stack spacing={1} direction="row" alignItems="center">
            <M3Fab size="small" dark elevation="none" onClick={saveHandler} sx={{ m: 0 }}>
              <SaveIcon />
            </M3Fab>
            <M3TextButton
              iconOnly
              onClick={resetChanges}
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
      </SlideAndFade>
      <Snackbar
        open={openLoading}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert elevation={1} severity="info">Salviamo modifiche...</Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        onClose={resetIdle}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert elevation={1} severity="success">Modifiche salvate!</Alert>
      </Snackbar>
    </>
  );
}
