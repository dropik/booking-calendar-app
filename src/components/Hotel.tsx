import React from "react";
import { hot } from "react-hot-loader";

import { useHotel, useScrollTop } from "../redux/hooks";

import Floor from "./Floor";
import RoomNumber from "./RoomNumber";

import "./Hotel.css";

type Props = {
  tableContainerRef: React.RefObject<HTMLDivElement>
};

function Hotel(props: Props) {
  const hotel = useHotel();
  const scrollTop = useScrollTop();

  const rows: JSX.Element[] = [];

  hotel.floors.forEach((floor, floorIndex) => {
    rows.push(
      <Floor key={floor.name} name={floor.name} isFollowing={floorIndex > 0} />
    );

    floor.rooms.forEach((room, roomIndex) => {
      const isLast = (floorIndex === hotel.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
      rows.push(<RoomNumber number={room.number} key={room.number} isLast={isLast} />);
    });
  });

  let scrollbarWidth = 0;
  const currentRef = props.tableContainerRef.current;
  if (currentRef) {
    scrollbarWidth = currentRef.offsetHeight - currentRef.clientHeight;
  }

  if (scrollbarWidth > 0) {
    rows.push(<div className="scrollbar-space" style={{ height: scrollbarWidth }}></div>);
  }

  return (
    <div className="hotel-container">
      <div className="hotel" style={{ top: -scrollTop + "px" }}>
        {rows}
      </div>
    </div>)
  ;
}

export default hot(module)(Hotel);
