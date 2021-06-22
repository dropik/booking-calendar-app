import React from 'react';
import { hot } from 'react-hot-loader';
import "./tile.css";

function Tile(props) {
  return (
    <div className="tile" style={{backgroundColor: props.colour, width: "calc(" + props.nights + "00% + " + props.nights + "px)"}}>
      <span className="tile-name">{props.name}</span>
      <span className="tile-room">{props.roomType}</span>
    </div>
  );
}

export default hot(module)(Tile);