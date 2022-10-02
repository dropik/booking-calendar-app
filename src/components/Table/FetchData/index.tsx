import React from "react";

import FetchFloorsData from "./FetchFloorsData";
import FetchRoomTypes from "./FetchRoomTypes";
import FetchTiles from "./FetchTiles";

export default function FetchData(): JSX.Element {
  return (
    <>
      <FetchRoomTypes />
      <FetchFloorsData />
      <FetchTiles />
    </>
  );
}
