import React, { useState } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import CheckIcon from "@mui/icons-material/Check";
import RestoreIcon from "@mui/icons-material/Restore";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as Api from "../../api";

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
    return (<span>Salvato <CheckIcon fontSize="small" /></span>);
  } else if (saveStatus === "loading") {
    return (<span>Salvataggio...</span>);
  } else if (!hasChanges) {
    return <></>;
  }
  return (
    <>
      <div onClick={resetHandler} className="button reset">
        <RestoreIcon />
      </div>
      <div onClick={saveHandler} className="button save">Salva</div>
    </>
  );
}
