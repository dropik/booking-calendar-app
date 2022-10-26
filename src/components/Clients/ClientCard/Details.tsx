import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ClientWithBooking } from "../../../api";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../../redux/bookingsFormSlice";
import { useAppDispatch } from "../../../redux/hooks";

import M3TextButton from "../../m3/M3TextButton";

type DetailsProps = {
  client: ClientWithBooking
};

export default function Details({ client }: DetailsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const periodStr = `${(new Date(client.bookingFrom)).toLocaleDateString()} - ${(new Date(client.bookingTo)).toLocaleDateString()}`;

  return (
    <Stack spacing={2} sx={{
      p: "1rem",
      borderTop: `1px solid ${theme.palette.outline.light}`
    }}>
      <Typography variant="titleLarge">Prenotazione</Typography>
      <Stack sx={{ pl: "1rem" }}>
        <Typography variant="titleMedium">{client.bookingName}</Typography>
        <Typography variant="bodySmall">{periodStr}</Typography>
      </Stack>
      <Stack alignItems="flex-end">
        <Link to={`/bookings/${client.bookingFrom}/${client.bookingId}`} style={{ textDecoration: "none" }}>
          <M3TextButton onClick={() => {
            dispatch(setBookingsFormFrom(client.bookingFrom));
            dispatch(setBookingsFormTo(client.bookingTo));
            dispatch(setBookingsFormName(client.bookingName));
          }}>
            Mostra prenotazione
          </M3TextButton>
        </Link>
      </Stack>
    </Stack>
  );
}
