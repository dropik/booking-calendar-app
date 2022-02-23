import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useLastFetchPeriod } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

function FetchTiles(): JSX.Element {
  const dispatch = useAppDispatch();
  const lastFetchPeriod = useLastFetchPeriod();

  useEffect(() => {
    dispatch(TilesSlice.fetchAsync({ from: lastFetchPeriod.from, to: lastFetchPeriod.to }));
  }, [dispatch, lastFetchPeriod]);

  return <></>;
}

export default hot(module)(FetchTiles);
