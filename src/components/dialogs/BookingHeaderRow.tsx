import React from "react";
import { hot } from "react-hot-loader";
import BookingRowContent from "./BookingRowContent";
import HeaderRow from "./HeaderRow";

function BookingHeaderRow(): JSX.Element {
  return (
    <HeaderRow>
      <BookingRowContent data={{ id: "ID", name: "Nome", from: "Dal", to: "Al" }} />
    </HeaderRow>
  );
}

export default hot(module)(BookingHeaderRow);
