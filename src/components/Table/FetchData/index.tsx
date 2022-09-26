import React from "react";

import FetchHotelData from "./FetchHotelData";
import FetchRoomTypes from "./FetchRoomTypes";
import FetchTiles from "./FetchTiles";

export default function FetchData(): JSX.Element {
  return (
    <>
      <FetchHotelData />
      <FetchRoomTypes />
      <FetchTiles />
    </>
  );
}
