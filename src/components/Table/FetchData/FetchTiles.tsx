import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/hooks";
import { fetchAsync } from "../../../redux/tilesSlice";

import FetchDataBase from "./FetchDataBase";

export default function FetchTiles(): JSX.Element {
  const args = useAppSelector((state) => state.table.lastFetchPeriod);
  const [, setUpdateRequest] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUpdateRequest((r) => r + 1), 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FetchDataBase fetchCallbackAsync={fetchAsync({ from: args.from, to: args.to })} />
  );
}
