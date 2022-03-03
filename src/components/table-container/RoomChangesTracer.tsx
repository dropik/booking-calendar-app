import React, { useEffect } from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch, useLastTileUpdate } from "../../redux/hooks";
import * as TilesSlice from "../../redux/tilesSlice";

function RoomChangesTracer(): JSX.Element {
  const dispatch = useAppDispatch();
  const lastTileUpdate = useLastTileUpdate();

  useEffect(() => {
    if (lastTileUpdate) {
      dispatch(TilesSlice.updateRoomNumber(lastTileUpdate));
    }
  }, [dispatch, lastTileUpdate]);

  return <></>;
}

export default hot(module)(RoomChangesTracer);
