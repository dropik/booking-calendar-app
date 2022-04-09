import React, { useCallback, useState } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DataDialog from "./DataDialog";
import BookingDialogBody from "./BookingDialogBody";

type Props = {
  onTryFetchBookingDataAsync: () => Promise<{ data: Api.BookingData }>
};

const initialData: Api.BookingData = {
  id: "",
  name: "",
  from: "",
  to: "",
  rooms: []
};

function BookingDialog({ onTryFetchBookingDataAsync }: Props): JSX.Element {
  const [bookingData, setBookingData] = useState<Api.BookingData>(initialData);

  const tryFetchDataAsync = useCallback<() => Promise<void>>(async () => {
    const response = await onTryFetchBookingDataAsync();
    setBookingData(response.data);
  }, [onTryFetchBookingDataAsync]);

  const bookingTitle = getTitleFromBookingData(bookingData);

  return (
    <DataDialog
      header={`Prenotazione ${bookingTitle}`}
      data={bookingData}
      onTryFetchDataAsync={tryFetchDataAsync}
    >
      <BookingDialogBody data={bookingData} />
    </DataDialog>
  );
}

function getTitleFromBookingData(data: Api.BookingData): string {
  return data.id.length === 0 ? "" : `#${data.id} (${data.name})`;
}

export default hot(module)(BookingDialog);
