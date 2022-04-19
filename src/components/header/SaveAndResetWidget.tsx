import React, { useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { alpha } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as Api from "../../api";

import FilledButton from "../m3/FilledButton";
import IconButton from "../m3/IconButton";

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
      right: "2.5rem",
      borderRadius: "1.75rem",
      paddingRight: "1rem",
      paddingLeft: "1rem",
      overflow: "visible",
      backgroundColor: (theme) => theme.palette.surface.main
    }}>
      {body}
      <Box sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: "inherit",
        pointerEvents: "none",
        backgroundColor: (theme) => alpha(theme.palette.surfaceTint.main, theme.opacities.surface1),
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
    <>
      <FilledButton onClick={saveHandler} sx={{ mr: 1, mt: 2, mb: 2 }}>
        Salva
      </FilledButton>
      <IconButton onClick={resetHandler}>
        <RestoreIcon />
      </IconButton>
    </>
  );
}
