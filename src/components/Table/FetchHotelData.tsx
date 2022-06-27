import React from "react";

import { fetchAsync } from "../../redux/hotelSlice";

import FetchDataBase from "./FetchDataBase";

export default function FetchHotelData(): JSX.Element {
  return (
    <FetchDataBase fetchCallbackAsync={fetchAsync()} />
  );
}
