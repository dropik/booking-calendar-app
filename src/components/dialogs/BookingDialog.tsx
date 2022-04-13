import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DataDialog from "./DataDialog";
import BookingDialogBody from "./BookingDialogBody";

type Props = {
  tryFetchBookingDataAsync: () => Promise<{ data: Api.BookingData }>
};

function BookingDialog({ tryFetchBookingDataAsync }: Props): JSX.Element {
  return (
    <DataDialog
      header={(data) => `Prenotazione ${getTitleFromBookingData(data)}`}
      tryFetchDataAsync={tryFetchBookingDataAsync}
    >
      {(data) => <BookingDialogBody data={data} />}
    </DataDialog>
  );
}

function getTitleFromBookingData(data: Api.BookingData | undefined): string {
  return data === undefined ? "" : `#${data.id} (${data.name})`;
}

export default hot(module)(BookingDialog);
