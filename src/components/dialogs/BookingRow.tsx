import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

type Props = {
  data: Api.BookingShortData
};

function BookingRow(props: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function showBooking(id: string) {
    dispatch(DialogSlice.showBookingDialog({ id }));
  }

  return (
    <div className="row button" onClick={() => { showBooking(props.data.id); }}>
      <div className="id">#{props.data.id}</div>
      <div className="name">{props.data.name}</div>
      <div className="from">{new Date(props.data.from).toLocaleDateString()}</div>
      <div className="to">{new Date(props.data.to).toLocaleDateString()}</div>
    </div>
  );
}

export default hot(module)(BookingRow);