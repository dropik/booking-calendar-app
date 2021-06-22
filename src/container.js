import React from "react";
import { hot } from "react-hot-loader";
import Tile from "./tile.js";
import "./container.css";

function Container(props) {
  let className = "container";
  if (props.isFollowing) {
    className += " container-following";
  }
  if (props.isRowFollowing) {
    className += " container-row-following";
  }

  let tile = (props.x == 1) && (props.y == 2) ? 
            <Tile name="Ivan Petrov" colour="rgba(217, 73, 73, 0.69)" roomType="doppia" nights="2"/> :
            "";

  return (
    <div className={className}>
      {tile}
    </div>
  );
}

export default hot(module)(Container);