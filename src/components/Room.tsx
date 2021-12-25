import React, { useMemo } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector, useColumns } from "../redux/hooks";

import TableCell from "./TableCell";

import "./Room.css";
import { move } from "../redux/mainSlice";

type Props = {
  y: number,
  isFirst: boolean,
  isLast: boolean
};

function Room(props: Props) {
  const columns = useColumns();
  const grabbedTile = useAppSelector(state => state.grabbedTile);
  const dispatch = useAppDispatch();
  const cells = useCellsMemo(columns, props.y);

  function onDrop(event: React.MouseEvent<HTMLDivElement>) {
    if ((grabbedTile.x >= 0) && (grabbedTile.y >= 0)) {
      dispatch(move({ x: grabbedTile.x, y: grabbedTile.y, pageY: event.pageY }));
    }
  }

  let className = "room";
  if (props.isFirst) {
    className += " room-first";
  }
  if (props.isLast) {
    className += " room-last";
  }

  return (
    <div className={className} onMouseUp={onDrop}>{cells}</div>
  );
}

function useCellsMemo(columns: number, y: number) {
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

export default hot(module)(Room);
