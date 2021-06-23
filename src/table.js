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

  for (let i = 0; i < rooms.floors.length; i++) {
    const floor = rooms.floors[i];
    var isFollowing = i > 0;
    rows.push(<Floor name={floor.name} key={floor.name} isFollowing={isFollowing}/>);

    const roomsForFloor = floor.rooms;
    for (var j = 0; j < roomsForFloor.length; j++) {
      const room = roomsForFloor[j];
      rows.push(<Room number={room.number} columns={props.columns} index={j} y={room.number} key={room.number} />);
    }
  }

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);