import React, { useCallback } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import BookingDialog from "./BookingDialog";

type Props = {
  tileId: string
};

function BookingByTileIdDialog({ tileId }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback<() => Promise<{ data: Api.BookingData }>>(() => Api.fetchBookingByTile(tileId), [tileId]);
  return <BookingDialog tryFetchBookingDataAsync={tryFetchDataAsync} />;
}

export default hot(module)(BookingByTileIdDialog);
