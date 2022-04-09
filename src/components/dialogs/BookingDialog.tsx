import React, { Dispatch, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import DialogHeader from "./DialogHeader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../redux/hooks";
import * as Api from "../../api";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import LoadingDataWrapper from "./LoadingDataWrapper";
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

function BookingDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [bookingData, setBookingData] = useState<Api.BookingData>(initialData);

  const bookingTitle = getTitleFromBookingData(bookingData);

  useFetchDataEffect(props.tileId, props.bookingId, dispatch, setBookingData);

  return (
    <div className="scrollable">
      <DialogHeader>Prenotazione {bookingTitle}</DialogHeader>
      <LoadingDataWrapper isLoaded={bookingData.id.length > 0}>
        <BookingDialogBody data={bookingData} />
      </LoadingDataWrapper>
    </div>
  );
}

function getTitleFromBookingData(data: Api.BookingData): string {
  return data.id.length === 0 ? "" : `#${data.id} (${data.name})`;
}

function useFetchDataEffect(
  tileId: string | undefined,
  bookingId: string | undefined,
  dispatch: Dispatch<AnyAction>,
  setBookingData: React.Dispatch<React.SetStateAction<Api.BookingData>>
): void {
  useEffect(() => {
    async function fetchData() {
      try {
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
      } catch (Error) {
        dispatch(ConnectionErrorSlice.show());
      }
    }
    fetchData();
  }, [dispatch, tileId, bookingId, setBookingData]);
}

export default hot(module)(BookingDialog);
