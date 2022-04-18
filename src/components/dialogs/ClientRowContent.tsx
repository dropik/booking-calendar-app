import React from "react";

type Props = {
  client: {
    name: string,
    surname: string,
    dateOfBirth: string
  },
  bookingName?: string
};

export default function ClientRowContent({ client, bookingName }: Props): JSX.Element {
  return (
    <>
      <div className="first-name">{client.name}</div>
      <div className="last-name">{client.surname}</div>
      <div className="date-of-birth">{new Date(client.dateOfBirth).toLocaleDateString()}</div>
      {bookingName ? <div className="booking-name">{bookingName}</div> : ""}
    </>
  );
}
