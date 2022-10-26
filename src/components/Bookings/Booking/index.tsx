import React from "react";

import { BookingShort } from "../../../api";

import BookingContext from "./context";
import Button from "./Button";
import Initials from "./Initials";
import ShortInfo from "./ShortInfo";
import RoomsCount from "./RoomsCount";

type BookingProps = {
  booking: BookingShort
};

export default function Booking({ booking }: BookingProps): JSX.Element {
  return (
    <BookingContext.Provider value={booking}>
      <Button>
        <Initials />
        <ShortInfo />
        <RoomsCount />
      </Button>
    </BookingContext.Provider>
  );
}
