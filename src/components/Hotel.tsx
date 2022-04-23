import React, { Fragment, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector, useHotelData } from "../redux/hooks";
import * as HotelSlice from "../redux/hotelSlice";
import * as RoomTypesSlice from "../redux/roomTypesSlice";

import DrawerAdjacent from "./m3/DrawerAdjacent";
import Floor from "./hotel/Floor";
import RoomNumber from "./hotel/RoomNumber";
import BottomSpace from "./hotel/BottomSpace";

import "./Hotel.css";

export default function Hotel(): JSX.Element {
  const dispatch = useAppDispatch();
  const hotelData = useHotelData();
  const scrollTop = useAppSelector(state => state.scroll.top);
  const rows = useRowsMemo(hotelData);
  const ref = useRef<HTMLDivElement>(null);

  useHotelDataFetchingEffect(dispatch);
  useRoomTypesFetchingEffect(dispatch);
  useScrollEffect(ref, scrollTop);

  return (
    <Box className="hotel-container">
      <DrawerAdjacent sx={{
        flexDirection: "column",
        border: "2px solid black",
        borderTop: "none"
      }}>
        <div ref={ref} className="hotel">
          {rows}
          <BottomSpace key="bottom-space" />
        </div>
      </DrawerAdjacent>
    </Box>)
  ;
}

function useRowsMemo(hotelData: HotelSlice.HotelData): JSX.Element[] {
  return useMemo(() => (
    hotelData.floors.map((floor, floorIndex) => (
      <Fragment key={floor.name}>
        <Floor name={floor.name} isFollowing={floorIndex > 0} />
        {
          floor.rooms.map((room, roomIndex) => {
            const isLast = (floorIndex === hotelData.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
            return (<RoomNumber key={room.number} number={room.number} isLast={isLast} />);
          })
        }
      </Fragment>
    ))
  ), [hotelData.floors]);
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

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, scrollTop: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.top = `${-scrollTop}px`;
    }
  }, [ref, scrollTop]);
}
