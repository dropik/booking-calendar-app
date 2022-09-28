import React from "react";

import FetchFloorsData from "./FetchFloorsData";
import FetchRoomsData from "./FetchRoomsData";
import FetchRoomTypes from "./FetchRoomTypes";
import FetchTiles from "./FetchTiles";

export default function FetchData(): JSX.Element {
  return (
    <>
      <FetchFloorsData />
      <FetchRoomsData />
      <FetchRoomTypes />
      <FetchTiles />
    </>
  );
}
