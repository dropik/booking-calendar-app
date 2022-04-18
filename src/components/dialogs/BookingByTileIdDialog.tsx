import React, { useCallback } from "react";

import * as Api from "../../api";

import BookingDialog from "./BookingDialog";

type Props = {
  tileId: string
};

export default function BookingByTileIdDialog({ tileId }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback<() => Promise<{ data: Api.BookingData }>>(() => Api.fetchBookingByTile(tileId), [tileId]);
  return <BookingDialog tryFetchBookingDataAsync={tryFetchDataAsync} />;
}
