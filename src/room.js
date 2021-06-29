import React from 'react';
import Container from './Container';
import RoomNumber from './RoomNumber';
import { hot } from 'react-hot-loader';
import "./Room.css";

function Room(props) {
  var columns = [];
  columns.push(<RoomNumber number={props.y} key="roomNumber" />);

  var roomData = props.roomData === undefined ? [] : props.roomData;

  for (var i = 0; i < props.columns; i++) {
    columns.push(<Container key={"x: " + i + "; y: " + props.y}
                            tileData={roomData[i]}
                            isLast={i == props.columns - 1} />);
  }

  var className = "room";
  if (props.index % 2 == 1) {
    className += " room-odd";
  }

  return <div className={className}>{columns}</div>;
}

export default hot(module)(Room);