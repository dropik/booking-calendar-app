import React from 'react';
import { hot } from 'react-hot-loader';
import Floor from './Floor';
import Room from './Room';
import "./Table.css";

function Table(props) {
  var rows = [];

  for (var i = 0; i < props.rooms.floors.length; i++) {
    const floor = props.rooms.floors[i];
    rows.push(<Floor key={floor.name} name={floor.name} isFollowing={i > 0}/>);

    const roomsForFloor = floor.rooms;
    for (var j = 0; j < roomsForFloor.length; j++) {
      const room = roomsForFloor[j];
      rows.push(<Room key={room.number}
                      y={room.number}
                      columns={props.columns}
                      roomData={props.occupations[room.number]}
                      index={j}
                      tiles={props.tiles}
                      occupationsDispatch={props.occupationsDispatch} />);
    }
  }

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);