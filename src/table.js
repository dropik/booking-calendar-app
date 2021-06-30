import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Floor from './Floor';
import Room from './Room';
import "./Table.css";
import { remToPx } from './utils';

function Table(props) {
  var rows = [];

  var rooms = {
    "floors": [
      {
        "name": "piano 1",
        "rooms": [
          {
            "number": 1,
            "type": "camera matrimoniale/doppia"
          },
          {
            "number": 2,
            "type": "appartamento"
          },
          {
            "number": 3,
            "type": "camera tripla"
          }
        ]
      },
      {
        "name": "piano 2",
        "rooms": [
          {
            "number": 6,
            "type": "camera matrimoniale/doppia"
          },
          {
            "number": 7,
            "type": "camera matrimoniale/doppia"
          },
          {
            "number": 8,
            "type": "camera singola"
          }
        ]
      }
    ]
  }

  const roomData = [];
  roomData[1] = 
  {
    name: "Ivan Petrov",
    colour: "rgba(217, 73, 73, 0.69)",
    roomType: "doppia",
    nights: "2"
  };

  const defaultOccupations = [];
  defaultOccupations[2] = roomData;
  const [occupations, setOccupations] = useState(defaultOccupations);

  function handleDrop(x, y, pageY) {
    var margin = remToPx(8) + 1;
    var tableY = pageY - margin;
    var rowHeight = remToPx(4) + 1;
    var targetRow = Math.floor(tableY / rowHeight);
    var targetY = -1;
    for (var i = 0; i < rooms.floors.length; i++) {
      const floor = rooms.floors[i];
      if (targetRow == 0) {
        break;
      }
      targetRow--;

      for (var j = 0; j < floor.rooms.length; j++) {
        const room = floor.rooms[j];
        if (targetRow == 0) {
          targetY = room.number;
          break;
        }
        targetRow--;
      }
    }

    if (targetY > 0) {
      setOccupations(prevOccupations => {
        var newOccupations = [...prevOccupations];

        var newOrigRoomData = [...newOccupations[y]];
        var room = newOrigRoomData[x];
        newOrigRoomData[x] = undefined;
        newOccupations[y] = newOrigRoomData;

        var newDestRoomData = (newOccupations[targetY] === undefined) ? [] : [...newOccupations[targetY]];
        newDestRoomData[x] = room;
        newOccupations[targetY] = newDestRoomData;

        return newOccupations;
      });
    }
  }

  for (var i = 0; i < rooms.floors.length; i++) {
    const floor = rooms.floors[i];
    rows.push(<Floor key={floor.name} name={floor.name} isFollowing={i > 0}/>);

    const roomsForFloor = floor.rooms;
    for (var j = 0; j < roomsForFloor.length; j++) {
      const room = roomsForFloor[j];
      rows.push(<Room key={room.number}
                      y={room.number}
                      columns={props.columns}
                      roomData={occupations[room.number]}
                      index={j}
                      onDrop={handleDrop} />);
    }
  }

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);