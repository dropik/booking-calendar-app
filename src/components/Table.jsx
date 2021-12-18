import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";

import Room from "./Room";

import "./Table.css";

function Table() {
  const hotel = useSelector(state => state.main.hotel);

  var rows = [];

  hotel.floors.forEach(floor => {
    floor.rooms.forEach((room, roomIndex) => {
      rows.push(
        <Room
          key={room.number}
          y={room.number}
          isFirst={roomIndex == 0}
        />
      );
    });
  });

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);
