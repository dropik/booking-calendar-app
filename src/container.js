import React from "react";
import { hot } from "react-hot-loader";
import Tile from "./Tile.js";
import "./Container.css";

function Container(props) {
  let tile = (props.x == 1) && (props.y == 2) ? 
            <Tile name="Ivan Petrov" colour="rgba(217, 73, 73, 0.69)" roomType="doppia" nights="2"/> :
            "";

  return (
    <div className="container">
      {tile}
    </div>
  );
}

export default hot(module)(Container);