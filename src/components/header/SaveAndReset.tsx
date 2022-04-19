import React, { useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as Api from "../../api";

import FilledButton from "../m3/FilledButton";
import IconButton from "../m3/IconButton";

import "../../globals.css";
import "./SaveAndReset.css";

type Status = "idle" | "loading" | "fulfilled";

export default function SaveAndReset(): JSX.Element {
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
  const body = getBody(status, hasChanges, resetHandler, saveHandler);

  return (<div className="save-and-reset">{body}</div>);
}

function useHasChanges(): boolean {
  return useAppSelector((state) => Object.keys(state.tiles.changesMap).length > 0);
}

function getResetHandler(dispatch: React.Dispatch<AnyAction>): () => void {
  return () => {
    dispatch(TilesSlice.undoChanges());
  };
}

function getBody(saveStatus: Status, hasChanges: boolean, resetHandler: () => void, saveHandler: () => void): JSX.Element {
  if (saveStatus === "fulfilled") {
    return (<Typography variant="bodyMedium">Salvato <CheckIcon fontSize="small" /></Typography>);
  } else if (saveStatus === "loading") {
    return (<CircularProgress color="primary" />);
  } else if (!hasChanges) {
    return <></>;
  }
  return (
    <>
      <IconButton onClick={resetHandler} sx={{ mr: 1 }}>
        <RestoreIcon />
      </IconButton>
      <FilledButton onClick={saveHandler}>Salva</FilledButton>
    </>
  );
}
