import React from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

type Props = {
  bookingId: string,
  client: {
    id: string,
    name: string,
    surname: string,
    dateOfBirth: string
  },
  bookingName?: string
};

function ClientRow({ bookingId, client, bookingName }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function showClient() {
    dispatch(DialogSlice.showClientDialog({ bookingId: bookingId, clientId: client.id }));
  }

  const bookingField = bookingName ? <div className="booking-name">{bookingName}</div> : "";

  return (
    <div className="row button" onClick={showClient}>
      <div className="first-name">{client.name}</div>
      <div className="last-name">{client.surname}</div>
      <div className="date-of-birth">{new Date(client.dateOfBirth).toLocaleDateString()}</div>
      {bookingField}
    </div>
  );
}

export default hot(module)(ClientRow);
