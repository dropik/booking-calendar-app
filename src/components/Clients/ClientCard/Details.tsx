import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { BookingShort, fetchBookingShortById } from "../../../api";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../../redux/bookingsFormSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { show as showMessage } from "../../../redux/snackbarMessageSlice";

import M3TextButton from "../../m3/M3TextButton";
import M3Skeleton from "../../m3/M3Skeleton";

type DetailsProps = {
  bookingId: string
};

export default function Details({ bookingId }: DetailsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [booking, setBooking] = useState<BookingShort | undefined>(undefined);

  const periodStr = booking ?
    `${(new Date(booking.from)).toLocaleDateString()} - ${(new Date(booking.to)).toLocaleDateString()}` :
    undefined;

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await fetchBookingShortById(bookingId);
        setBooking(response.data);
      } catch(error) {
        dispatch(showMessage({ type: "error" }));
      }
    }

    fetchData();
  }, [bookingId, dispatch]);

  return (
    <Stack spacing={2} sx={{
      p: "1rem",
      borderTop: `1px solid ${theme.palette.outline.light}`
    }}>
      <Typography variant="titleLarge">Prenotazione</Typography>
      <Stack sx={{ pl: "1rem" }}>
        <Typography variant="titleMedium">{booking ? booking.name : <M3Skeleton width="6rem" />}</Typography>
        <Typography variant="bodySmall">{periodStr ? periodStr : <M3Skeleton width="8rem" />}</Typography>
      </Stack>
      <Stack alignItems="flex-end">
        {booking ? (
          <Link to={`/bookings/${booking.from}/${booking.id}`} style={{ textDecoration: "none" }}>
            <M3TextButton onClick={() => {
              dispatch(setBookingsFormFrom(booking.from));
              dispatch(setBookingsFormTo(booking.to));
              dispatch(setBookingsFormName(booking.name));
            }}>
              Mostra prenotazione
            </M3TextButton>
          </Link>
        ) : <Box sx={{ height: "2.5rem" }}></Box>}
      </Stack>
    </Stack>
  );
}
