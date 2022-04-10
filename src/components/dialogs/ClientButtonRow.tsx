import React from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";
import ClientRowContent from "./ClientRowContent";
import ButtonRow from "./ButtonRow";

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
    <ButtonRow onClick={showClient}>
      <ClientRowContent client={client} bookingName={bookingName} />
    </ButtonRow>
  );
}

export default hot(module)(ClientButtonRow);
