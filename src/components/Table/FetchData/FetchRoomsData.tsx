import React from "react";

import { fetchAsync } from "../../../redux/roomsSlice";

import FetchDataBase from "./FetchDataBase";

export default function FetchRoomsData(): JSX.Element {
  return (
    <FetchDataBase fetchCallbackAsync={fetchAsync()} />
  );
}
