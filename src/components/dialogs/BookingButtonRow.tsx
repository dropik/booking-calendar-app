import React from "react";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import ButtonInput from "./ButtonInput";
import BookingRowContent from "./BookingRowContent";

type Props = {
  data: Api.BookingShortData
};

export default function BookingButtonRow({ data }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  function showBooking(id: string) {
    dispatch(DialogSlice.showBookingDialog({ id }));
  }

  return (
    <ButtonInput className="row" onClick={() => { showBooking(data.id); }}>
      <BookingRowContent data={data} />
    </ButtonInput>
  );
}
