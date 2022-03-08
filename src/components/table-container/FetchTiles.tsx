import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";
import * as TableSlice from "../../redux/tableSlice";

function FetchTiles(): JSX.Element {
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

export default hot(module)(FetchTiles);
