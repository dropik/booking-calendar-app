import React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";

import { ClientData } from "../../../api";
import { useAppSelector } from "../../../redux/hooks";

import M3IconButton from "../../m3/M3IconButton";
import M3TextButton from "../../m3/M3TextButton";

type ClientCardProps = {
  client: ClientData
};

export default function ClientCard({ client }: ClientCardProps): JSX.Element {
  const theme = useTheme();
  const drawerOpened = useAppSelector((state) => state.drawer.open);

  const formattedFrom = (new Date(client.booking.from)).toLocaleDateString();
  const formattedTo = (new Date(client.booking.to)).toLocaleDateString();
  const periodStr = `${formattedFrom} - ${formattedTo}`;

  return (
    <Grid item xs={drawerOpened ? 4 : 3} >
      <Stack sx={{
        borderRadius: "0.75rem",
        border: `1px solid ${theme.palette.outline.light}`,
        mr: "0.5rem",
        mb: "0.5rem"
      }}>
        <Stack sx={{ p: "1rem" }}>
          <Typography variant="headlineMedium">{`${client.name} ${client.surname}`}</Typography>
          <Typography variant="titleMedium">{(new Date(client.dateOfBirth).toLocaleDateString())}</Typography>
          <Stack sx={{ pt: "0.5rem" }} justifyContent="space-between" alignItems="center" direction="row">
            <Typography variant="bodySmall">
              {`${client.placeOfBirth ? `${client.placeOfBirth} - ` : ""}${client.stateOfBirth}`}
            </Typography>
            <M3IconButton><ExpandMoreOutlined /></M3IconButton>
          </Stack>
        </Stack>
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
            <M3TextButton>Mostra prenotazione</M3TextButton>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
