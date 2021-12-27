import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useHotelData } from "../../redux/hooks";
import * as table from "../../redux/tableSlice";

import Room from "./Room";

import "./Table.css";

function Table(): JSX.Element {
  const hotelData = useHotelData();
  const dispatch = useAppDispatch();

  const rows: JSX.Element[] = [];

  hotelData.floors.forEach((floor, floorIndex) => {
    floor.rooms.forEach((room, roomIndex) => {
      const isLast = (floorIndex === hotelData.floors.length - 1) && (roomIndex === floor.rooms.length - 1);
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

  useTilesFetchingEffect(dispatch);

  return <div className="table">{rows}</div>;
}

function useTilesFetchingEffect(dispatch: React.Dispatch<table.FetchTilesAsyncAction>): void {
  useEffect(() => {
    dispatch(table.fetchTilesAsync());
  }, [dispatch]);
}

export default hot(module)(Table);
