import React from "react";
import { hot } from "react-hot-loader";
import Tile from "./tile.js";
import "./container.css";

function Container(props) {
  return (
    <div className="container">
      <Tile name="Ivan Petrov" colour="rgba(217, 73, 73, 0.69)" roomType="doppia" nights="2"/>
    </div>
  );
}

export default hot(module)(Container);