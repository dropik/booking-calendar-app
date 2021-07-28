import React from 'react';
import { hot } from 'react-hot-loader';
import Floor from './floor';
import Room from './room';
import "./table.css";

function Table(props) {
  var rows = [];

  const floors = props.rooms.floors;
  const length = floors.length;
  for (var i = 0; i < length; i++) {
    const floor = floors[i];

    rows.push(<Floor key={floor.name} name={floor.name} isFollowing={i > 0}/>);

    const rooms = floor.rooms;
    const length = rooms.length;
    for (var j = 0; j < length; j++) {
      const room = rooms[j];
      
      rows.push(<Room key={room.number}
                      y={room.number}
                      columns={props.columns}
                      roomData={props.occupations[room.number]}
                      tiles={props.tiles}
                      occupationsDispatch={props.occupationsDispatch} />);
    }
  }

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);