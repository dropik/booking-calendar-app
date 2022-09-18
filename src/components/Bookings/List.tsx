import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";

import { BookingShortData, fetchBookings } from "../../api";

import Booking from "./Booking";

type ListProps = {
  name: string,
  from: string,
  to: string,
  isValid: boolean
}

export default function List({ name, from, to, isValid }: ListProps): JSX.Element {
  const [bookings, setBookings] = useState<BookingShortData[]>([]);

  useEffect(() => {
    let subscribed = true;

    async function fetchData() {
      if (isValid) {
        const response = await fetchBookings(name, from, to);
        if (subscribed) {
          setBookings(response.data);
        }
      }
    }

    fetchData();

    return () => { subscribed = false; };
  }, [name, from, to, isValid]);

  return (
    <Stack spacing={0} sx={{ mt: "9.5rem", height: "calc(100vh - 19rem)", overflow: "scroll" }}>
      {bookings.map((booking) => <Booking key={booking.id} booking={booking}/>)}
    </Stack>
  );
}