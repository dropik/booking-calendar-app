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
  const cells = dates.map((value: string) => (
    <TableCell
      key={value}
      x={value}
      y={props.y}
    />
  ));

  const dropHandler = getDropHandler(dispatch, props.y);

  let className = "room";
  if (props.isFirst) {
    className += " room-first";
  }
  if (props.isLast) {
    className += " room-last";
  }

  return (
    <div className={className} onMouseUp={dropHandler}>{cells}</div>
  );
}

function getDropHandler(
  dispatch: React.Dispatch<AnyAction>,
  y: number
): () => void {
  return () => {
    dispatch(TilesSlice.move({ newY: y }));
  };
}

export default hot(module)(Room);
