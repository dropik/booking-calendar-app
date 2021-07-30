import React from 'react';
import { hot } from 'react-hot-loader';
import Room from './room';
import "./table.css";

function Table(props) {
  var rows = [];

  props.hotel.floors.forEach((floor, index) => {
    //rows.push(<Floor key={floor.name} name={floor.name} isFollowing={index > 0}/>);
    floor.rooms.forEach((room, roomIndex) => {
      rows.push(<Room key={room.number}
                      y={room.number}
                      columns={props.columns}
                      roomData={props.occupations[room.number]}
                      tiles={props.tiles}
                      occupationsDispatch={props.occupationsDispatch}
                      isFirst={roomIndex == 0} />);
    });
  });

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);