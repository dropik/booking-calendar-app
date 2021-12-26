import React, { useEffect, useMemo } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useHotelData, useScrollTop } from "../redux/hooks";
import * as hotel from "../redux/hotelSlice";

import Floor from "./Floor";
import RoomNumber from "./RoomNumber";

import "./Hotel.css";

type Props = {
  tableContainerRef: React.RefObject<HTMLDivElement>
};

function Hotel(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();
  const scrollTop = useScrollTop();
  const rows = useRowsMemo(hotelData);

  useEffect(() => {
    dispatch(hotel.fetchAsync());
  }, [dispatch]);

  useHotelbarBottomSpacingEffect(props.tableContainerRef, rows);

  return (
    <div className="hotel-container">
      <div className="hotel" style={{ top: -scrollTop + "px" }}>
        {rows}
      </div>
    </div>)
  ;
}

function useRowsMemo(hotelData: hotel.HotelData): JSX.Element[] {
  return useMemo(() => {
    const rows: JSX.Element[] = [];

    hotelData.floors.forEach((floor, floorIndex) => {
      rows.push(
        <Floor key={floor.name} name={floor.name} isFollowing={floorIndex > 0} />
      );

      floor.rooms.forEach((room, roomIndex) => {
        const isLast = (floorIndex === hotelData.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
        rows.push(<RoomNumber number={room.number} key={room.number} isLast={isLast} />);
      });
    });

    return rows;
  }, [hotelData.floors]);
}

function useHotelbarBottomSpacingEffect(
  tableContainerRef: React.RefObject<HTMLDivElement>,
  rows: JSX.Element[]
): void {
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
