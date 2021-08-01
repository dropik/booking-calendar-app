import React from 'react';
import { hot } from 'react-hot-loader';
import TableCell from './TableCell';
import "./Room.css";

function Room(props) {
  var columns = [];
  var roomData = props.roomData === undefined ? [] : props.roomData;

  for (var i = 0; i < props.columns; i++) {
    columns.push(<TableCell key={"x: " + i + "; y: " + props.y}
                            tileData={roomData[i]}
                            isLast={i == props.columns - 1}
                            x={i}
                            y={props.y}
                            occupationsDispatch={props.occupationsDispatch} />);
  }

  var className = "room";
  if (props.isFirst) {
    className += " room-first";
  }

  return <div className={className}>{columns}</div>;
}

export default hot(module)(Room);