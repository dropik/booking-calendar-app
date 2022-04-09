import React from "react";
import { hot } from "react-hot-loader";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

type Props = {
  data: {
    id: string,
    name: string,
    surname: string,
    dateOfBirth: string
  }
};

function GuestRow(props: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function showClient(id: string) {
    dispatch(DialogSlice.showClientDialog({ bookingId: props.data.id, clientId: id }));
  }

  return (
    <div className="row person button" onClick={() => { showClient(props.data.id); }}>
      <div>{props.data.name}</div>
      <div>{props.data.surname}</div>
      <div>{new Date(props.data.dateOfBirth).toLocaleDateString()}</div>
    </div>
  );
}

export default hot(module)(GuestRow);
