import React from "react";
import { hot } from "react-hot-loader";

import { useHotel } from "../redux/hooks";

import Room from "./Room";

import "./Table.css";

function Table() {
  const hotel = useHotel();

  const rows: JSX.Element[] = [];

  hotel.floors.forEach((floor, floorIndex) => {
    floor.rooms.forEach((room, roomIndex) => {
      const isLast = (floorIndex === hotel.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
      rows.push(
        <Room
          key={room.number}
          y={room.number}
          isFirst={roomIndex == 0}
          isLast={isLast}
        />
      );
    });
  });

  return <div className="table">{rows}</div>;
}

export default hot(module)(Table);
