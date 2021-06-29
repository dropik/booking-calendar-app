import React from "react";
import { hot } from "react-hot-loader";
import Tile from "./Tile.js";
import "./Container.css";

function Container(props) {
  var className = "container";
  if (props.isLast) {
    className += " container-last";
  }

  var tile = props.tileData !== undefined ? 
            <Tile name={props.tileData.name}
                  colour={props.tileData.colour}
                  roomType={props.tileData.roomType}
                  nights={props.tileData.nights} /> :
            "";

  return (
    <div className={className}>
      {tile}
    </div>
  );
}

export default hot(module)(Container);