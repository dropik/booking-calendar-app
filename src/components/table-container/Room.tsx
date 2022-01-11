import React, { useMemo } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import * as Utils from "../../utils";
import { useAppDispatch, useColumns, useGrabbedTile, useLeftmostDate } from "../../redux/hooks";
import * as GrabbedTileSlice from "../../redux/grabbedTileSlice";
import * as OccupationsSlice from "../../redux/occupationsSlice";

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
  const leftmostDate = useLeftmostDate();
  const cells = useCellsMemo(columns, props.y, leftmostDate);

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

function useCellsMemo(columns: number, y: number, leftmostDate: string): JSX.Element[] {
  return useMemo(() => {
    const cells = [];
    const dateCounter = new Date(leftmostDate);

    for (let i = 0; i < columns; i++) {
      const x = Utils.dateToString(dateCounter);
      cells.push(
        <TableCell
          key={x}
          x={x}
          y={y}
        />
      );
      dateCounter.setDate(dateCounter.getDate() + 1);
    }

    return cells;
  }, [columns, y, leftmostDate]);
}

function getDropHandler(
  dispatch: React.Dispatch<AnyAction>,
  grabbedTile: GrabbedTileSlice.State,
  y: number
): () => void {
  return () => {
    if ((grabbedTile.x !== "") && (grabbedTile.y >= 0)) {
      dispatch(OccupationsSlice.move({ x: grabbedTile.x, y: grabbedTile.y, newY: y }));
    }
  };
}

export default hot(module)(Room);
