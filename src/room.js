import React from 'react';
import Container from './Container';
import RoomNumber from './RoomNumber';
import { hot } from 'react-hot-loader';
import "./Room.css";

function Room(props) {
  var columns = [];
  columns.push(<RoomNumber number={props.number} key="roomNumber" />);

  var roomData = [
    {
      x: 1,
      data: {
        name: "Ivan Petrov",
        colour: "rgba(217, 73, 73, 0.69)",
        roomType: "doppia",
        nights: "2"
      }
    }
  ];

  var currentDate = 0;
  var tileData;
  for (var i = 0; i < props.columns; i++) {
    if ((currentDate < roomData.length) && (roomData[currentDate].x === i)) {
      tileData = roomData[currentDate].data;
      currentDate++;
    }
    columns.push(<Container key={"x: " + i + "; y: " + props.y}
                            tileData={tileData}
                            isLast={i == props.columns - 1} />);
    tileData = undefined;
  }

  var className = "room";
  if (props.index % 2 == 1) {
    className += " room-odd";
  }

  return <div className={className}>{columns}</div>;
}

export default hot(module)(Room);