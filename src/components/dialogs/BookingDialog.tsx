import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DataDialog from "./DataDialog";
import BookingDialogBody from "./BookingDialogBody";

type Props = {
  tileId?: string,
  bookingId?: string
};

const initialData: Api.BookingData = {
  id: "",
  name: "",
  from: "",
  to: "",
  rooms: []
};

function BookingDialog({ tileId, bookingId }: Props): JSX.Element {
  const [bookingData, setBookingData] = useState<Api.BookingData>(initialData);
  const tryFetchDataAsync = useTryFetchDataAsyncCallback(tileId, bookingId, setBookingData);

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

function useTryFetchDataAsyncCallback(
  tileId: string | undefined,
  bookingId: string | undefined,
  setBookingData: Dispatch<SetStateAction<Api.BookingData>>
): () => Promise<void> {
  return useCallback<() => Promise<void>>(async () => {
    let data: Api.BookingData | undefined;

    if (tileId) {
      const response = await Api.fetchBookingByTile(tileId);
      data = response.data;
    } else if (bookingId) {
      const response = await Api.fetchBookingById(bookingId);
      data = response.data;
    }

    if (data) {
      setBookingData(data);
    }
  }, [tileId, bookingId, setBookingData]);
}

function getTitleFromBookingData(data: Api.BookingData): string {
  return data.id.length === 0 ? "" : `#${data.id} (${data.name})`;
}

export default hot(module)(BookingDialog);
