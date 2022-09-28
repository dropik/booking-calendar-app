import React from "react";

import { fetchAsync } from "../../../redux/floorsSlice";

import FetchDataBase from "./FetchDataBase";

export default function FetchFloorsData(): JSX.Element {
  return (
    <FetchDataBase fetchCallbackAsync={fetchAsync()} />
  );
}
