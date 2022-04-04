import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import BookingDialogBody from "./BookingDialogBody";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import * as Api from "../../api";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";

import DialogHeader from "./DialogHeader";

type DialogState = "idle" | "loading";

type Props = {
  fadeOutDialog: () => void
};

function BookingDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const tileId = useAppSelector((state) => state.dialog.selectedTile);
  const [dialogState, setDialogState] = useState<DialogState>("idle");
  const [bookingData, setBookingData] = useState<Api.BookingData>();

  const bookingDescription = bookingData === undefined ? "" : `#${bookingData.id} (${bookingData.name})`;

  useEffect(() => {
    async function fetchData() {
      try {
        if (tileId) {
          const response = await Api.fetchBookingByTile(tileId);
          setBookingData(response.data);
          setDialogState("idle");
        }
      } catch (Error) {
        dispatch(ConnectionErrorSlice.show());
        setDialogState("idle");
      }
    }
    fetchData();
    setDialogState("loading");
  }, [dispatch, tileId]);

  return (
    <>
      <DialogHeader title={`Prenotazione ${bookingDescription}`} fadeOutDialog={props.fadeOutDialog} />
      <BookingDialogBody data={bookingData} dialogState={dialogState} />
    </>
  );
}

export default hot(module)(BookingDialog);
