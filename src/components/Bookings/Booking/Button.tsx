import React, { useContext } from "react";

import BookingContext from "./context";
import M3ListItemButton from "../../m3/M3ListItemButton";
import M3NavLink from "../../m3/M3NavLink";

type ButtonProps = {
  children: React.ReactNode
};

export default function Button({ children }: ButtonProps): JSX.Element {
  const booking = useContext(BookingContext);

  return (
    <M3NavLink to={`/app/bookings/${booking.from}/${booking.id}`}>
      {({ isActive }) => (
        <M3ListItemButton selected={isActive} sx={{
          height: "4.75rem",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderRadius: "0.75rem"
        }}>
          {children}
        </M3ListItemButton>
      )}
    </M3NavLink>
  );
}
