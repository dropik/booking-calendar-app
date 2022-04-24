import React, { useRef, useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as TilesSlice from "../redux/tilesSlice";
import * as ConnectionErrorSlice from "../redux/connectionErrorSlice";
import * as Api from "../api";

import SlideAndFade from "./m3/SlideAndFade";
import M3Card from "./m3/M3Card";
import M3TextButton from "./m3/M3TextButton";
import M3Fab from "./m3/M3Fab";

type Status = "idle" | "loading" | "fulfilled";

export default function SaveAndResetWidget(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasChanges = useHasChanges();
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

  function tryResetIdle() {
    if (!hasChanges) {
      setStatus("idle");
    }
  }

  const resetHandler = getResetHandler(dispatch);
  const body = getBody(status, resetHandler, saveHandler);

  return (
    <>
      <Box sx={{
        position: "fixed",
        pointerEvents: "none",
        bottom: "2.5rem",
        right: "3rem"
      }} ref={ref}></Box>
      <SlideAndFade in={hasChanges} container={ref.current} onExited={tryResetIdle} boxSx={{
        position: "fixed",
        bottom: "2.5rem",
        right: "3rem"
      }}>
        <M3Card borderRadius="1.75rem">{body}</M3Card>
      </SlideAndFade>
    </>
  );
}

function useHasChanges(): boolean {
  return useAppSelector((state) => Object.keys(state.tiles.changesMap).length > 0);
}

function getResetHandler(dispatch: React.Dispatch<AnyAction>): () => void {
  return () => {
    dispatch(TilesSlice.undoChanges());
  };
}

function getBody(saveStatus: Status, resetHandler: () => void, saveHandler: () => void): JSX.Element {
  if (saveStatus === "fulfilled") {
    return (
      <Typography variant="bodyMedium" sx={{ color: (theme) => theme.palette.outline.main }}>
        <CheckIcon />
      </Typography>
    );
  } else if (saveStatus === "loading") {
    return (<CircularProgress color="primary" />);
  }

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <M3Fab size="small" dark elevation="none" onClick={saveHandler} sx={{ m: 0 }}>
        <SaveIcon />
      </M3Fab>
      <M3TextButton
        iconOnly
        onClick={resetHandler}
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
  );
}
