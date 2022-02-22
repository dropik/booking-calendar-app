import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  useHotelDataFetchingEffect(dispatch);
  useHotelbarBottomSpacingEffect(tableDimentions, rows);
  useScrollEffect(ref, scrollTop);

  return (
    <div className="hotel-container">
      <div ref={ref} className="hotel">
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
    const scrollbarWidth = tableDimentions.offsetHeight - tableDimentions.clientHeight - 1;
    if (scrollbarWidth > 0) {
      rows.push(
        <div
          className="scrollbar-space"
          key="scrollbar-space"
          style={{ height: scrollbarWidth }}>
        </div>
      );
    }

    return () => {
      if (scrollbarWidth > 0) {
        rows.pop();
      }
    };
  }, [tableDimentions, rows]);
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, scrollTop: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${-scrollTop}px`;
    }
  }, [ref, scrollTop]);
}

export default hot(module)(Hotel);
