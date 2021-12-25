import React, { useMemo } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch, useColumns, useGrabbedTile } from "../redux/hooks";
import { move } from "../redux/mainSlice";
import { GrabbedTileState } from "../redux/grabbedTileSlice";

import TableCell from "./TableCell";

import "./Room.css";

type Props = {
  y: number,
  isFirst: boolean,
  isLast: boolean
};

function Room(props: Props): JSX.Element {
  const columns = useColumns();
  const grabbedTile = useGrabbedTile();
  const dispatch = useAppDispatch();
  const cells = useCellsMemo(columns, props.y);

  const dropHandler = getDropHandler(dispatch, grabbedTile, props.y);

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

function useCellsMemo(columns: number, y: number): JSX.Element[] {
  return useMemo(() => {
    const cells = [];

    for (let i = 0; i < columns; i++) {
      cells.push(
        <TableCell
          key={"x: " + i + "; y: " + y}
          x={i}
          y={y}
        />
      );
    }

    return cells;
  }, [columns, y]);
}

function getDropHandler(
  dispatch: React.Dispatch<AnyAction>,
  grabbedTile: GrabbedTileState,
  y: number
): () => void {
  return () => {
    if ((grabbedTile.x >= 0) && (grabbedTile.y >= 0)) {
      dispatch(move({ x: grabbedTile.x, y: grabbedTile.y, newY: y }));
    }
  };
}

export default hot(module)(Room);
