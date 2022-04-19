import React, { useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { alpha } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as Api from "../../api";

import TextButton from "../m3/TextButton";
import Fab from "../m3/Fab";

import "../../globals.css";
import "./SaveAndReset.css";

type Status = "idle" | "loading" | "fulfilled";

export default function SaveAndResetWidget(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasChanges = useHasChanges();
  const changes = useAppSelector((state) => state.tiles.changesMap);
  const [status, setStatus] = useState<Status>("idle");

  function saveHandler() {
    async function launchSaveAsync(): Promise<void> {
      try {
        await Api.postChangesAsync(changes);
        dispatch(TilesSlice.saveChanges());
        setStatus("fulfilled");
        setTimeout(() => setStatus("idle"), 1000);
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
        setStatus("idle");
      }
    }
    launchSaveAsync();
    setStatus("loading");
  }

  const resetHandler = getResetHandler(dispatch);
  const body = getBody(status, resetHandler, saveHandler);

  return (
    <Card elevation={1} sx={{
      position: "fixed",
      bottom: "2.5rem",
      right: "3rem",
      borderRadius: "0.75rem",
      overflow: "visible",
      paddingLeft: "1.25rem",
      paddingRight: "1.25rem",
      backgroundColor: (theme) => theme.palette.surface.main
    }}>
      {body}
      <Box sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: "none",
        borderRadius: "inherit",
        backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.opacities.surface1)
      }}></Box>
    </Card>
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
        Salvato <CheckIcon fontSize="small" />
      </Typography>
    );
  } else if (saveStatus === "loading") {
    return (<CircularProgress color="primary" />);
  }

  return (
    <Stack spacing={2} direction="column" alignItems="center" justifyContent="flex-end" sx={{ mt: 2.5, mb: 2.5 }}>
      <TextButton startIcon={<RestoreIcon />} onClick={resetHandler} sx={{ width: "2.5rem", height: "2.5rem", padding: 0, minWidth: "unset" }} />
      <Fab size="small" colourCombination="surface" lowered onClick={saveHandler}>
        <SaveIcon />
      </Fab>
    </Stack>
  );
}
