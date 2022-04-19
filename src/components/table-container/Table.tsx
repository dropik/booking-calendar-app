import React from "react";

import { useHotelData } from "../../redux/hooks";

import Room from "./Room";

import "./Table.css";

export default function Table(): JSX.Element {
  const hotelData = useHotelData();

  return (
    <div className="table">
      {
        hotelData.floors.map((floor, floorIndex) => (
          floor.rooms.map((room, roomIndex) => {
            const isLast = (floorIndex === hotelData.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
            return (
              <Room
                key={room.number}
                y={room.number}
                isFirst={roomIndex == 0}
                isLast={isLast}
              />
            );
          })
        ))
      }
    </div>
  );
}
