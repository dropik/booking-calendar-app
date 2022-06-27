import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAsync } from "../../redux/tilesSlice";

export default function FetchTiles(): null {
  const dispatch = useAppDispatch();
  const lastFetchPeriod = useAppSelector(state => state.table.lastFetchPeriod);

  useEffect(() => {
    dispatch(fetchAsync({ from: lastFetchPeriod.from, to: lastFetchPeriod.to }));
  }, [dispatch, lastFetchPeriod]);

  return null;
}
