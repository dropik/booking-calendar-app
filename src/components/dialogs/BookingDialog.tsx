import React, { Dispatch, useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import DialogHeader from "./DialogHeader";
import { AnyAction } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../redux/hooks";
import * as Api from "../../api";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import BookingDialogBody from "./BookingDialogBody";

type DialogState = "idle" | "loading";

type Props = {
  tileId?: string,
  bookingId?: string
};

function BookingDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [dialogState, setDialogState] = useState<DialogState>("idle");
  const [bookingData, setBookingData] = useState<Api.BookingData>();

  const bookingTitle = getTitleFromBookingData(bookingData);

  useFetchDataEffect(props.tileId, props.bookingId, dispatch, setBookingData, setDialogState);

  return (
    <div className="scrollable">
      <DialogHeader title={`Prenotazione ${bookingTitle}`} />
      <BookingDialogBody data={bookingData} dialogState={dialogState} />
    </div>
  );
}

function getTitleFromBookingData(data: Api.BookingData | undefined): string {
  return data === undefined ? "" : `#${data.id} (${data.name})`;
}

function useFetchDataEffect(
  tileId: string | undefined,
  bookingId: string | undefined,
  dispatch: Dispatch<AnyAction>,
  setBookingData: React.Dispatch<React.SetStateAction<Api.BookingData | undefined>>,
  setDialogState: React.Dispatch<React.SetStateAction<DialogState>>
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
      } finally {
        setDialogState("idle");
      }
    }
    fetchData();
    setDialogState("loading");
  }, [dispatch, tileId, bookingId, setBookingData, setDialogState]);
}

export default hot(module)(BookingDialog);
