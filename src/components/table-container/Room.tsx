import React, { useMemo } from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";

import * as Utils from "../../utils";
import { useAppDispatch, useColumns, useLeftmostDate } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import TableCell from "./TableCell";

import "./Room.css";

type Props = {
  y: number,
  isFirst: boolean,
  isLast: boolean
};

function Room(props: Props): JSX.Element {
  const columns = useColumns();
  const dispatch = useAppDispatch();
  const leftmostDate = useLeftmostDate();
  const cells = useCellsMemo(columns, props.y, leftmostDate);

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
  y: number
): () => void {
  return () => {
    dispatch(TilesSlice.move({ newY: y }));
  };
}

export default hot(module)(Room);
