import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import BookingDialogBody from "./BookingDialogBody";

import { useAppDispatch } from "../../redux/hooks";
import * as Api from "../../api";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import DialogHeader from "./DialogHeader";

type DialogState = "idle" | "loading";

type Props = {
  tileId?: string,
  bookingId?: string,
  fadeOutDialog: () => void
};

function BookingDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [dialogState, setDialogState] = useState<DialogState>("idle");
  const [bookingData, setBookingData] = useState<Api.BookingData>();

  const bookingDescription = bookingData === undefined ? "" : `#${bookingData.id} (${bookingData.name})`;

  useEffect(() => {
    async function fetchData() {
      try {
        let data: Api.BookingData | undefined;

        if (props.tileId) {
          const response = await Api.fetchBookingByTile(props.tileId);
          data = response.data;
        } else if (props.bookingId) {
          const response = await Api.fetchBookingById(props.bookingId);
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
  }, [dispatch, props.tileId, props.bookingId]);

  return (
    <>
      <DialogHeader title={`Prenotazione ${bookingDescription}`} fadeOutDialog={props.fadeOutDialog} />
      <BookingDialogBody data={bookingData} dialogState={dialogState} />
    </>
  );
}

export default hot(module)(BookingDialog);
