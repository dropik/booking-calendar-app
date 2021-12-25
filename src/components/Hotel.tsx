import React, { useEffect, useMemo } from "react";
import { hot } from "react-hot-loader";

import { useHotel, useScrollTop } from "../redux/hooks";
import { HotelData } from "../redux/mainSlice";

import Floor from "./Floor";
import RoomNumber from "./RoomNumber";

import "./Hotel.css";

type Props = {
  tableContainerRef: React.RefObject<HTMLDivElement>
};

function Hotel(props: Props) {
  const hotel = useHotel();
  const scrollTop = useScrollTop();
  const rows = useRowsMemo(hotel);

  useHotelbarBottomSpacingEffect(props.tableContainerRef, rows);

  return (
    <div className="hotel-container">
      <div className="hotel" style={{ top: -scrollTop + "px" }}>
        {rows}
      </div>
    </div>)
  ;
}

function useRowsMemo(hotel: HotelData) {
  return useMemo(() => {
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

    return rows;
  }, [hotel.floors]);
}

function useHotelbarBottomSpacingEffect(tableContainerRef: React.RefObject<HTMLDivElement>, rows: JSX.Element[]) {
  useEffect(() => {
    let scrollbarWidth = 0;
    const currentRef = tableContainerRef.current;
    if (currentRef) {
      scrollbarWidth = currentRef.offsetHeight - currentRef.clientHeight;
    }

    if (scrollbarWidth > 0) {
      rows.push(<div className="scrollbar-space" key="scrollbar-space" style={{ height: scrollbarWidth }}></div>);
    }
  }, [tableContainerRef, rows]);
}

export default hot(module)(Hotel);
