import React from "react";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import ClientRowContent from "./ClientRowContent";
import ButtonInput from "./ButtonInput";

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

export default function ClientButtonRow({ bookingId, client, bookingName }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function showClient() {
    dispatch(DialogSlice.showClientDialog({ bookingId: bookingId, clientId: client.id }));
  }

  return (
    <ButtonInput className="row" onClick={showClient}>
      <ClientRowContent client={client} bookingName={bookingName} />
    </ButtonInput>
  );
}
