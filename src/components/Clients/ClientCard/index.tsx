import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlined from "@mui/icons-material/ExpandLessOutlined";

import { ClientData } from "../../../api";
import { useAppDispatch } from "../../../redux/hooks";
import { setBookingsFormFrom, setBookingsFormName, setBookingsFormTo } from "../../../redux/bookingsFormSlice";

import M3IconButton from "../../m3/M3IconButton";
import M3TextButton from "../../m3/M3TextButton";

type ClientCardProps = {
  client: ClientData
};

export default function ClientCard({ client }: ClientCardProps): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const formattedFrom = (new Date(client.booking.from)).toLocaleDateString();
  const formattedTo = (new Date(client.booking.to)).toLocaleDateString();
  const periodStr = `${formattedFrom} - ${formattedTo}`;

  return (
    <Stack sx={{
      borderRadius: "0.75rem",
      border: `1px solid ${theme.palette.outline.light}`,
      mr: "0.5rem",
      mb: "0.5rem",
      overflow: "hidden"
    }}>
      <Stack spacing={2} sx={{ position: "relative", p: "1rem", flexGrow: 1 }}>
        <Stack>
          <Typography variant="headlineMedium">{`${client.name} ${client.surname}`}</Typography>
          <Typography variant="titleMedium">{(new Date(client.dateOfBirth).toLocaleDateString())}</Typography>
        </Stack>
        <Typography variant="bodySmall">
          {`${client.placeOfBirth ? `${client.placeOfBirth} - ` : ""}${client.stateOfBirth}`}
        </Typography>
        <M3IconButton sx={{ position: "absolute", right: "1rem", bottom: "0.5rem" }} onClick={() => setOpen(!open)}>
          {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        </M3IconButton>
      </Stack>
      <Collapse in={open} easing={theme.transitions.easing.fastOutSlowIn}>
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
      </Collapse>
    </Stack>
  );
}
