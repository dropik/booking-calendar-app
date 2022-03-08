import React from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import "./SaveAndReset.css";

function SaveAndReset(): JSX.Element {
  const dispatch = useAppDispatch();
  const hasChanges = useHasChanges();

  if (!hasChanges) {
    return <></>;
  }

  const resetHandler = getResetHandler(dispatch);
  const saveHandler = getSaveHandler(dispatch);

  return (
    <div className="save-and-reset">
      <div onClick={resetHandler} className="button reset">
        <FontAwesomeIcon icon={faRotateLeft} />
      </div>
      <div onClick={saveHandler} className="button save">Salva</div>
    </div>
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

function getSaveHandler(dispatch: React.Dispatch<AnyAction>): () => void {
  return () => {
    dispatch(TilesSlice.saveChanges());
  };
}

export default hot(module)(SaveAndReset);
