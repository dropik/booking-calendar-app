import React, { useCallback } from "react";

import * as Api from "../../api";
import BookingDialog from "./BookingDialog";

type Props = {
  id: string
}

export default function BookingByIdDialog({ id }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback<() => Promise<{ data: Api.BookingData }>>(() => Api.fetchBookingById(id), [id]);
  return <BookingDialog tryFetchBookingDataAsync={tryFetchDataAsync} />;
}
