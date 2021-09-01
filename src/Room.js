import React from 'react';
import { hot } from 'react-hot-loader';
import TableCell from './TableCell';
import { useSelector } from 'react-redux';
import "./Room.css";

function Room(props) {
  const columns = useSelector(state => state.main.columns);

  var cells = [];
  var roomData = props.roomData === undefined ? [] : props.roomData;

  for (var i = 0; i < columns; i++) {
    cells.push(
      <TableCell  key={"x: " + i + "; y: " + props.y}
                  tileData={roomData[i]}
                  x={i}
                  y={props.y}
                  onTileMove={props.onTileMove}
      />
    );
  }

  var className = "room";
  if (props.isFirst) {
    className += " room-first";
  }

  return <div className={className}>{cells}</div>;
}

export default hot(module)(Room);