import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as TableSlice from "../../redux/tableSlice";

export default function FetchTiles(): JSX.Element {
  const dispatch = useAppDispatch();
  const lastFetchPeriod = useLastFetchPeriod();

  useEffect(() => {
    dispatch(TilesSlice.fetchAsync({ from: lastFetchPeriod.from, to: lastFetchPeriod.to }));
  }, [dispatch, lastFetchPeriod]);

  return <></>;
}

function useLastFetchPeriod(): TableSlice.FetchPeriod {
  return useAppSelector(state => state.table.lastFetchPeriod);
}
