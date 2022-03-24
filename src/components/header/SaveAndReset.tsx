import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as SaveChangesSlice from "../../redux/saveChangesSlice";

import "../../globals.css";
import "./SaveAndReset.css";

function SaveAndReset(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasChanges = useHasChanges();
  const saveStatus = useSaveStatus();

  useResetIdleOnTimeoutEffect(dispatch, saveStatus);

  const resetHandler = getResetHandler(dispatch);
  const saveHandler = getSaveHandler(dispatch);
  const body = getBody(saveStatus, hasChanges, resetHandler, saveHandler);

  return (<div className="save-and-reset">{body}</div>);
}

function useHasChanges(): boolean {
  return useAppSelector((state) => Object.keys(state.tiles.changesMap).length > 0);
}

function useSaveStatus(): SaveChangesSlice.Status {
  return useAppSelector((state) => state.saveChanges.status);
}

function useResetIdleOnTimeoutEffect(dispatch: React.Dispatch<AnyAction>, saveStatus: SaveChangesSlice.Status): void {
  useEffect(() => {
    if (saveStatus === "fulfilled") {
      const timeout = setTimeout(() => dispatch(SaveChangesSlice.resetIdle()), 1000);
      return () => clearTimeout(timeout);
    }
  }, [dispatch, saveStatus]);
}

function getResetHandler(dispatch: React.Dispatch<AnyAction>): () => void {
  return () => {
    dispatch(TilesSlice.undoChanges());
  };
}

function getSaveHandler(dispatch: React.Dispatch<SaveChangesSlice.PostAsyncAction>): () => void {
  return () => {
    dispatch(SaveChangesSlice.postChangesAsync());
  };
}

function getBody(saveStatus: SaveChangesSlice.Status, hasChanges: boolean, resetHandler: () => void, saveHandler: () => void): JSX.Element {
  if (saveStatus === "fulfilled") {
    return (<span>Salvato <FontAwesomeIcon icon={faCheck} /></span>);
  } else if (saveStatus === "loading") {
    return (<span>Salvataggio...</span>);
  } else if (!hasChanges) {
    return <></>;
  }
  return (
    <>
      <div onClick={resetHandler} className="button reset">
        <FontAwesomeIcon icon={faRotateLeft} />
      </div>
      <div onClick={saveHandler} className="button save">Salva</div>
    </>
  );
}

export default hot(module)(SaveAndReset);
