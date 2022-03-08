import React, { memo } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useHasUnassignedTiles } from "../../../redux/hooks";
import * as TilesSlice from "../../../redux/tilesSlice";

import "./Day.css";
import DayAlert from "./DayAlert";

type Props = {
  x: string
};

function Day(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const hasUnassignedTiles = useHasUnassignedTiles(props.x);

  const day = props.x.substring(8);
  const clickHandler = getClickHandler(dispatch, props.x);

  return (
    <div className="day" onMouseDown={onMouseDown} onClick={clickHandler}>
      <b>{day}</b>
      <DayAlert hasUnassignedTiles={hasUnassignedTiles} />
    </div>
  );
}

function getClickHandler(dispatch: React.Dispatch<AnyAction>, x: string): () => void {
  return () => {
    if(document.getSelection() && document.getSelection()?.empty) {
      document.getSelection()?.empty();
    } else if(window.getSelection()) {
      window.getSelection()?.removeAllRanges();
    }
    dispatch(TilesSlice.toggleDate({ date: x }));
  };
}

function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}

export default memo(hot(module)(Day));
