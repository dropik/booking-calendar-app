import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { BookingShortData, fetchBookings } from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showMessage } from "../../redux/snackbarMessageSlice";

import Booking from "./Booking";
import Skeleton from "./Skeleton";

type ListProps = {
  name: string,
  from: string,
  to: string,
  isValid: boolean
}

export default function List({ name, from, to, isValid }: ListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [bookings, setBookings] = useState<BookingShortData[]>([]);

  useEffect(() => {
    let subscribed = true;

    async function fetchData() {
      if (isValid) {
        try {
          const response = await fetchBookings(name, from, to);
          if (subscribed) {
            setBookings(response.data);
          }
        } catch(error) {
          dispatch(showMessage({ type: "error" }));
        }
      }
    }

    fetchData();

    return () => { subscribed = false; };
  }, [dispatch, name, from, to, isValid]);

  return (
    <Box sx={{ maxHeight: "calc(100vh - 20.75rem)", overflowY: "auto" }}>
      <Stack spacing={0} sx={{ position: "relative", pb: "1rem" }}>
        {bookings.length > 0 ?
          bookings.map((booking) => <Booking key={booking.id} booking={booking}/>) :
          <Skeleton />}
      </Stack>
    </Box>
  );
}
