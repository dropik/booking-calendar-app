import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../redux/hooks";

import Floor from "./Floor";
import RoomNumber from "./RoomNumber";

import "./Hotel.css";

function Hotel() {
  const hotel = useAppSelector(state => state.main.hotel);

  const rows: JSX.Element[] = [];

  hotel.floors.forEach((floor, index) => {
    rows.push(
      <Floor key={floor.name} name={floor.name} isFollowing={index > 0} />
    );

    floor.rooms.forEach(room => {
      rows.push(<RoomNumber number={room.number} key={room.number} />);
    });
  });

  return <div className="hotel">{rows}</div>;
}

export default hot(module)(Hotel);
