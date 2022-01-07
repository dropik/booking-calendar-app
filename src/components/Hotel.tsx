import React, { useEffect, useMemo } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useHotelData, useScrollTop, useTableDimentions } from "../redux/hooks";
import * as HotelSlice from "../redux/hotelSlice";

import Floor from "./hotel/Floor";
import RoomNumber from "./hotel/RoomNumber";

import "./Hotel.css";

function Hotel(): JSX.Element {
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();
  const scrollTop = useScrollTop();
  const tableDimentions = useTableDimentions();
  const rows = useRowsMemo(hotelData);

  useHotelDataFetchingEffect(dispatch);
  useHotelbarBottomSpacingEffect(tableDimentions, rows);

  return (
    <div className="hotel-container">
      <div className="hotel" style={{ top: -scrollTop + "px" }}>
        {rows}
      </div>
    </div>)
  ;
}

function useRowsMemo(hotelData: HotelSlice.HotelData): JSX.Element[] {
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

function useHotelDataFetchingEffect(dispatch: React.Dispatch<HotelSlice.FetchAsyncAction>): void {
  useEffect(() => {
    dispatch(HotelSlice.fetchAsync());
  }, [dispatch]);
}

function useHotelbarBottomSpacingEffect(
  tableDimentions: { offsetHeight: number, clientHeight: number },
  rows: JSX.Element[]
): void {
  useEffect(() => {
    const scrollbarWidth = tableDimentions.offsetHeight - tableDimentions.clientHeight;
    if (scrollbarWidth > 0) {
      rows.push(
        <div
          className="scrollbar-space"
          key="scrollbar-space"
          style={{ height: scrollbarWidth }}>
        </div>
      );
    }

    return () => { rows.pop(); };
  }, [tableDimentions, rows]);
}

export default hot(module)(Hotel);
