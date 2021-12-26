import React from "react";
import { hot } from "react-hot-loader";
import { useHotelData } from "../../redux/hooks";

import Room from "./Room";

import "./Table.css";

function Table(): JSX.Element {
  const hotelData = useHotelData();
  const rows: JSX.Element[] = [];

  hotelData.floors.forEach((floor, floorIndex) => {
    floor.rooms.forEach((room, roomIndex) => {
      const isLast = (floorIndex === hotelData.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
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
