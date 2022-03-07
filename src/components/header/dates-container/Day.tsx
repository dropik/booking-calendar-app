import React, { memo } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useHasUnassignedTiles } from "../../../redux/hooks";
import * as UnassignedTilesSlice from "../../../redux/unassignedTilesSlice";

import "./Day.css";

type Props = {
  x: string
};

function Day(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const hasUnassignedTiles = useHasUnassignedTiles(props.x);

  const day = props.x.substring(8);
  const alert = getAlert(hasUnassignedTiles);
  const clickHandler = getClickHandler(dispatch, props.x);

  return (
    <div className="day" onMouseDown={onMouseDown} onClick={clickHandler}>
      <b>{day}</b>
      {alert}
    </div>
  );
}

function getAlert(hasUnassignedTiles: boolean): JSX.Element {
  return hasUnassignedTiles ?
    <span
      className="day-alert"
      title="Ci sono occupazioni non assegnati"
    >
      <FontAwesomeIcon icon={faCircleExclamation} />
    </span> :
    <></>;
}

function getClickHandler(dispatch: React.Dispatch<AnyAction>, x: string): () => void {
  return () => {
    if(document.getSelection() && document.getSelection()?.empty) {
      document.getSelection()?.empty();
    } else if(window.getSelection()) {
      window.getSelection()?.removeAllRanges();
    }
    dispatch(UnassignedTilesSlice.toggleDate({ date: x }));
  };
}

function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}

export default memo(hot(module)(Day));
