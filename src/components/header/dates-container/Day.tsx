import React, { memo } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import * as TilesSlice from "../../../redux/tilesSlice";
import * as ContextMenuSlice from "../../../redux/contextMenuSlice";

import "./Day.css";
import DayAlert from "./DayAlert";

type Props = {
  x: string
};

function Day(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const hasUnassignedTiles = useHasUnassignedTiles(props.x);
  const selected = useAppSelector((state) => state.tiles.selectedDate === props.x);

  const day = props.x.substring(8);
  const clickHandler = getClickHandler(dispatch, props.x);
  const mouseDownHandler = getMouseDownHandler(dispatch);

  let className = "day";
  if (selected && hasUnassignedTiles) {
    className += " selected";
  }

  return (
    <div className={className} onMouseDown={mouseDownHandler} onClick={clickHandler}>
      <b>{day}</b>
      <DayAlert hasUnassignedTiles={hasUnassignedTiles} />
    </div>
  );
}

function useHasUnassignedTiles(x: string) {
  return useAppSelector(state => (state.tiles.unassignedMap[x] !== undefined) && (Object.keys(state.tiles.unassignedMap[x]).length > 0));
}

function getClickHandler(
  dispatch: React.Dispatch<AnyAction>,
  x: string
): () => void {
  return () => {
    if(document.getSelection() && document.getSelection()?.empty) {
      document.getSelection()?.empty();
    } else if(window.getSelection()) {
      window.getSelection()?.removeAllRanges();
    }
    dispatch(TilesSlice.toggleDate({ date: x }));
  };
}

function getMouseDownHandler(dispatch: React.Dispatch<AnyAction>): (event: React.MouseEvent<HTMLDivElement>) => void {
  return (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    dispatch(ContextMenuSlice.hide());
  };
}

export default memo(hot(module)(Day));
