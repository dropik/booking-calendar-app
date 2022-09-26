import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { BookingShortData, fetchBookingShortById } from "../../../api";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../../redux/bookingsFormSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { show as showMessage } from "../../../redux/snackbarMessageSlice";

import M3TextButton from "../../m3/M3TextButton";

type DetailsProps = {
  bookingId: string
};

export default function Details({ bookingId }: DetailsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [data, setData] = useState<BookingShortData | undefined>(undefined);

  const formattedFrom = data ? (new Date(data.from)).toLocaleDateString() : "";
  const formattedTo = data ? (new Date(data.to)).toLocaleDateString() : "";
  const periodStr = `${formattedFrom} - ${formattedTo}`;

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await fetchBookingShortById(bookingId);
        setData(response.data);
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
        <Typography variant="titleMedium">{data?.name}</Typography>
        <Typography variant="bodySmall">{periodStr}</Typography>
      </Stack>
      <Stack alignItems="flex-end">
        <Link to={`/bookings/${data?.id}`} style={{ textDecoration: "none" }}>
          {data ? (
            <M3TextButton onClick={() => {
              dispatch(setBookingsFormFrom(data.from));
              dispatch(setBookingsFormTo(data.to));
              dispatch(setBookingsFormName(data.name));
            }}>
              Mostra prenotazione
            </M3TextButton>
          ): null}
        </Link>
      </Stack>
    </Stack>
  );
}
