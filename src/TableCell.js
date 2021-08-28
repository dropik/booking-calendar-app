import React from "react";
import { hot } from "react-hot-loader";
import Tile from "./Tile";
import "./TableCell.css";

function TableCell(props) {
  var tile = props.tileData !== undefined ? 
            <Tile name={props.tileData.name}
                  colour={props.tileData.colour}
                  roomType={props.tileData.roomType}
                  nights={props.tileData.nights}
                  x={props.x}
                  y={props.y}
                  onTileMove={props.onTileMove}
            /> :
            "";

  return (
    <div className="table-cell">
      {tile}
    </div>
  );
}

export default hot(module)(TableCell);