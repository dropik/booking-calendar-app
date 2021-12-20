import React from "react";
import { hot } from "react-hot-loader";

import { useHotel } from "../redux/hooks";

import Room from "./Room";

import "./Table.css";

function Table() {
  const hotel = useHotel();

  const rows: JSX.Element[] = [];

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
