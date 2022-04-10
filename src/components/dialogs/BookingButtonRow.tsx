import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import ButtonRow from "./ButtonRow";
import BookingRowContent from "./BookingRowContent";

type Props = {
  data: Api.BookingShortData
};

function BookingButtonRow({ data }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function showBooking(id: string) {
    dispatch(DialogSlice.showBookingDialog({ id }));
  }

  return (
    <ButtonRow onClick={() => { showBooking(data.id); }}>
      <BookingRowContent data={data} />
    </ButtonRow>
  );
}

export default hot(module)(BookingButtonRow);
