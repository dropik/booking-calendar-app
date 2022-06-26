import React from "react";

import { useAppDispatch, useDates } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

import TableCell from "./TableCell";

import "./Room.css";

type Props = {
  y: number,
  isFirst: boolean,
  isLast: boolean
};

export default function Room({ y, isFirst, isLast }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const dates = useDates();

  const cells = getCells(dates, y);
  const className = getClassName(isFirst, isLast);

  function tryDropTile(event: React.MouseEvent<HTMLDivElement>) {
    if (event.button == 0) {
      dispatch(TilesSlice.move({ newY: y }));
    }
  }

  return (
    <div className={className} onMouseUp={tryDropTile}>{cells}</div>
  );
}

function getCells(dates: string[], y: number): JSX.Element[] {
  return dates.map((date) => (
    <TableCell
      key={date}
      x={date}
      y={y}
    />
  ));
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
