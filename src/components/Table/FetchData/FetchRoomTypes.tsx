import React from "react";

import { fetchRoomRatesAction } from "../../../redux/roomTypesSlice";

import FetchDataBase from "./FetchDataBase";

export default function FetchRoomTypes(): JSX.Element {
  return (
    <FetchDataBase fetchCallbackAsync={fetchRoomRatesAction()} />
  );
}
