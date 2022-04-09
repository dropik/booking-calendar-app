import React, { useCallback } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import BookingDialog from "./BookingDialog";

type Props = {
  id: string
}

function BookingByIdDialog({ id }: Props): JSX.Element {
  const tryFetchDataAsync = useCallback<() => Promise<{ data: Api.BookingData }>>(() => Api.fetchBookingById(id), [id]);
  return <BookingDialog tryFetchBookingDataAsync={tryFetchDataAsync} />;
}

export default hot(module)(BookingByIdDialog);
