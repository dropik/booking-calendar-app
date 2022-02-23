import React from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useDates } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import TableCell from "./TableCell";

import "./Room.css";

type Props = {
  y: number,
  isFirst: boolean,
  isLast: boolean
};

function Room(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const dates = useDates();

  const cells = getCells(dates, props.y);
  const dropHandler = getDropHandler(dispatch, props.y);
  const className = getClassName(props.isFirst, props.isLast);

  return (
    <div className={className} onMouseUp={dropHandler}>{cells}</div>
  );
}

function getCells(dates: Generator<string, void, void>, y: number): JSX.Element[] {
  const cells = [];
  for (const date of dates) {
    cells.push(
      <TableCell
        key={date}
        x={date}
        y={y}
      />
    );
  }
  return cells;
}

function getDropHandler(
  dispatch: React.Dispatch<AnyAction>,
  y: number
): () => void {
  return () => {
    dispatch(TilesSlice.move({ newY: y }));
  };
}

function getClassName(isFirst: boolean, isLast: boolean): string {
  let className = "room";
  if (isFirst) {
    className += " room-first";
  }
  if (isLast) {
    className += " room-last";
  }
  return className;
}

export default hot(module)(Room);
