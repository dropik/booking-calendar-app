import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useHotelData, useLastFetchPeriod } from "../../redux/hooks";
import * as OccupationsSlice from "../../redux/occupationsSlice";
import * as TableSlice from "../../redux/tableSlice";

import Room from "./Room";

import "./Table.css";

function Table(): JSX.Element {
  const hotelData = useHotelData();
  const dispatch = useAppDispatch();
  const lastFetchPeriod = useLastFetchPeriod();

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

  useTilesFetchingEffect(dispatch, lastFetchPeriod);

  return <div className="table">{rows}</div>;
}

function useTilesFetchingEffect(dispatch: React.Dispatch<OccupationsSlice.FetchAsyncAction>, lastFetchPeriod: TableSlice.FetchPeriod): void {
  useEffect(() => {
    dispatch(OccupationsSlice.fetchAsync({ from: lastFetchPeriod.from, to: lastFetchPeriod.to }));
  }, [dispatch, lastFetchPeriod]);
}

export default hot(module)(Table);
