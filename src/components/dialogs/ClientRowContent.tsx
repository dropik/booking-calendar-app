import React from "react";
import { hot } from "react-hot-loader";

type Props = {
  client: {
    id: string,
    name: string,
    surname: string,
    dateOfBirth: string
  },
  bookingName?: string
};

function ClientRowContent({ client, bookingName }: Props): JSX.Element {
  return (
    <>
      <div className="first-name">{client.name}</div>
      <div className="last-name">{client.surname}</div>
      <div className="date-of-birth">{new Date(client.dateOfBirth).toLocaleDateString()}</div>
      {bookingName ? <div className="booking-name">{bookingName}</div> : ""}
    </>
  );
}

export default hot(module)(ClientRowContent);
