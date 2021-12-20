import React from "react";
import { hot } from "react-hot-loader";

import { useColumns } from "../redux/hooks";

import TableCell from "./TableCell";

import "./Room.css";

type Props = {
  y: number,
  isFirst: boolean
};

function Room(props: Props) {
  const columns = useColumns();

  const cells = [];

  for (let i = 0; i < columns; i++) {
    cells.push(
      <TableCell
        key={"x: " + i + "; y: " + props.y}
        x={i}
        y={props.y}
      />
    );
  }

  let className = "room";
  if (props.isFirst) {
    className += " room-first";
  }

  return <div className={className}>{cells}</div>;
}

export default hot(module)(Room);
