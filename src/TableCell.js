import React from "react";
import { hot } from "react-hot-loader";
import Tile from "./Tile";
import "./TableCell.css";

function TableCell(props) {
  var className = "table-cell";
  if (props.isLast) {
    className += " table-cell-last";
  }

  var tile = props.tileData !== undefined ? 
            <Tile name={props.tileData.name}
                  colour={props.tileData.colour}
                  roomType={props.tileData.roomType}
                  nights={props.tileData.nights}
                  x={props.x}
                  y={props.y}
                  occupationsDispatch={props.occupationsDispatch} /> :
            "";

  return (
    <div className={className}>
      {tile}
    </div>
  );
}

export default hot(module)(TableCell);