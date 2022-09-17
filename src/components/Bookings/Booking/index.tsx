import React from "react";

import { BookingShortData } from "../../../api";

import BookingContext from "./context";
import M3ListItemButton from "../../m3/M3ListItemButton";
import M3NavLink from "../../m3/M3NavLink";
import Initials from "./Initials";
import ShortInfo from "./ShortInfo";
import RoomsCount from "./RoomsCount";

type BookingProps = {
  booking: BookingShortData
};

export default function Booking({ booking }: BookingProps): JSX.Element {
  return (
    <BookingContext.Provider value={booking}>
      <M3NavLink to={`/bookings/${booking.id}`}>
        {({ isActive }) => (
          <M3ListItemButton selected={isActive} sx={{
            height: "4.75rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderRadius: "0.75rem"
          }}>
            <Initials />
            <ShortInfo />
            <RoomsCount />
          </M3ListItemButton>
        )}
      </M3NavLink>
    </BookingContext.Provider>
  );
}
