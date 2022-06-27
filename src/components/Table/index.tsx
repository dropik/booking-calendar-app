import React, { useEffect } from "react";

import { useAppDispatch } from "../../redux/hooks";
import * as HotelSlice from "../../redux/hotelSlice";
import * as RoomTypesSlice from "../../redux/roomTypesSlice";

import DrawerAdjacent from "../m3/DrawerAdjacent";
import FetchTiles from "../TableContainer/FetchTiles";
import Floors from "./Floors";

export default function Table(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(HotelSlice.fetchAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(RoomTypesSlice.fetchAsync());
  }, [dispatch]);

  return (
    <DrawerAdjacent>
      <FetchTiles />
      <Floors />
    </DrawerAdjacent>
  );
}
