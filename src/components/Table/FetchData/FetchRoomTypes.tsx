import React from "react";

import { fetchAsync } from "../../../redux/roomTypesSlice";

import FetchDataBase from "./FetchDataBase";

export default function FetchRoomTypes(): JSX.Element {
  return (
    <FetchDataBase fetchCallbackAsync={fetchAsync()} />
  );
}
