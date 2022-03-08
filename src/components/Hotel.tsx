import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector, useHotelData } from "../redux/hooks";
import * as HotelSlice from "../redux/hotelSlice";
import * as RoomTypesSlice from "../redux/roomTypesSlice";

import Floor from "./hotel/Floor";
import RoomNumber from "./hotel/RoomNumber";

import "./Hotel.css";

function Hotel(): JSX.Element {
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();
  const scrollTop = useScrollTop();
  const offsetHeight = useTableOffsetHeight();
  const clientHeight = useTableClientHeight();
  const rows = useRowsMemo(hotelData);
  const ref = useRef<HTMLDivElement>(null);

  useHotelDataFetchingEffect(dispatch);
  useRoomTypesFetchingEffect(dispatch);
  useHotelbarBottomSpacingEffect(offsetHeight, clientHeight, rows);
  useScrollEffect(ref, scrollTop);

  return (
    <div className="hotel-container">
      <div ref={ref} className="hotel">
        {rows}
      </div>
    </div>)
  ;
}

function useTableOffsetHeight() {
  return useAppSelector(state => state.table.offsetHeight);
}

function useTableClientHeight() {
  return useAppSelector(state => state.table.clientHeight);
}

function useScrollTop() {
  return useAppSelector(state => state.scroll.top);
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

function useRoomTypesFetchingEffect(dispatch: React.Dispatch<RoomTypesSlice.FetchAsyncAction>): void {
  useEffect(() => {
    dispatch(RoomTypesSlice.fetchAsync());
  }, [dispatch]);
}

function useHotelbarBottomSpacingEffect(
  offsetHeight: number,
  clientHeight: number,
  rows: JSX.Element[]
): void {
  useEffect(() => {
    const scrollbarWidth = offsetHeight - clientHeight - 1;
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
  }, [offsetHeight, clientHeight, rows]);
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, scrollTop: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${-scrollTop}px`;
    }
  }, [ref, scrollTop]);
}

export default hot(module)(Hotel);
