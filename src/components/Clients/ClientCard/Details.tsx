import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ClientData } from "../../../api";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../../redux/bookingsFormSlice";
import { useAppDispatch } from "../../../redux/hooks";

import M3TextButton from "../../m3/M3TextButton";

type DetailsProps = {
  client: ClientData
};

export default function Details({ client }: DetailsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const formattedFrom = (new Date(client.booking.from)).toLocaleDateString();
  const formattedTo = (new Date(client.booking.to)).toLocaleDateString();
  const periodStr = `${formattedFrom} - ${formattedTo}`;

  return (
    <Stack spacing={2} sx={{
      p: "1rem",
      borderTop: `1px solid ${theme.palette.outline.light}`
    }}>
      <Typography variant="titleLarge">Prenotazione</Typography>
      <Stack sx={{ pl: "1rem" }}>
        <Typography variant="titleMedium">{client.booking.name}</Typography>
        <Typography variant="bodySmall">{periodStr}</Typography>
      </Stack>
      <Stack alignItems="flex-end">
        <Link to={`/bookings/${client.booking.id}`} style={{ textDecoration: "none" }}>
          <M3TextButton onClick={() => {
            dispatch(setBookingsFormFrom(client.booking.from));
            dispatch(setBookingsFormTo(client.booking.to));
            dispatch(setBookingsFormName(client.booking.name));
          }}>
            Mostra prenotazione
          </M3TextButton>
        </Link>
      </Stack>
    </Stack>
  );
}
