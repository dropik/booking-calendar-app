import React from "react";
import { hot } from "react-hot-loader";

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

function ClientButtonRow({ bookingId, client, bookingName }: Props): JSX.Element {
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

export default hot(module)(ClientButtonRow);
