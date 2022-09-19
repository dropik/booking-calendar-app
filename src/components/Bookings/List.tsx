import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { BookingShortData, fetchBookings } from "../../api";

import Booking from "./Booking";
import { SurfaceTint } from "../m3/Tints";

type ListProps = {
  name: string,
  from: string,
  to: string,
  isValid: boolean
}

export default function List({ name, from, to, isValid }: ListProps): JSX.Element {
  const theme = useTheme();
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
    <Box sx={{
      mt: "9.5rem",
      height: "calc(100vh - 20rem)",
      overflowY: "auto",
      borderRadius: "0.75rem"
    }}>
      <Stack spacing={0} sx={{ position: "relative", minHeight: "100%" }}>
        {bookings.map((booking) => <Booking key={booking.id} booking={booking}/>)}
        <SurfaceTint sx={{
          backgroundColor: theme.palette.primary.light,
          opacity: theme.opacities.surface1
        }} />
      </Stack>
    </Box>
  );
}
