import React from "react";
import { hot } from "react-hot-loader";

import { HotelData } from "../redux/hotelSlice";

import Room from "./Room";

import "./Table.css";

type Props = {
  hotelData: HotelData
};

function Table(props: Props): JSX.Element {
  const rows: JSX.Element[] = [];

  props.hotelData.floors.forEach((floor, floorIndex) => {
    floor.rooms.forEach((room, roomIndex) => {
      const isLast = (floorIndex === props.hotelData.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
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
