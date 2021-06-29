import React from 'react';
import { hot } from 'react-hot-loader';
import Floor from './Floor';
import Room from './Room';
import "./Table.css";

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

  var roomData = [];
  roomData[1] = 
  {
    name: "Ivan Petrov",
    colour: "rgba(217, 73, 73, 0.69)",
    roomType: "doppia",
    nights: "2"
  };

  var occupations = [];
  occupations[2] = roomData;

  for (let i = 0; i < rooms.floors.length; i++) {
    const floor = rooms.floors[i];
    rows.push(<Floor key={floor.name} name={floor.name} isFollowing={i > 0}/>);

    const roomsForFloor = floor.rooms;
    for (var j = 0; j < roomsForFloor.length; j++) {
      const room = roomsForFloor[j];
      rows.push(<Room key={room.number}
                      y={room.number}
                      columns={props.columns}
                      roomData={occupations[room.number]}
                      index={j} />);
    }
  }

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);