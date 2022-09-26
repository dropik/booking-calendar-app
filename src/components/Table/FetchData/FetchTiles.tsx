import React from "react";

import { useAppSelector } from "../../../redux/hooks";
import { fetchAsync } from "../../../redux/tilesSlice";

import FetchDataBase from "./FetchDataBase";

export default function FetchTiles(): JSX.Element {
  const args = useAppSelector((state) => state.table.lastFetchPeriod);

  return (
    <FetchDataBase fetchCallbackAsync={fetchAsync({ from: args.from, to: args.to })} />
  );
}
