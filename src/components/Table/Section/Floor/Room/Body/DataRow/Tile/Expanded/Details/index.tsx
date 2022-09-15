import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import { ClientShortData, fetchClientsByTile } from "../../../../../../../../../../api";
import { TileContext } from "../../context";

import M3TextButton from "../../../../../../../../../m3/M3TextButton";
import Error from "./Error";
import Client from "./Client";

type DetailsProps = {
  open: boolean,
  onClose: () => void
};

export default function Details({ open, onClose }: DetailsProps): JSX.Element {
  const { data } = useContext(TileContext);
  const theme = useTheme();
  const [clients, setClients] = useState<ClientShortData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchClientsByTile(data.id);
      setClients(response.data);
    }
    fetchData().catch();
  }, [data.id]);

  return (
    <Collapse in={open} easing={{
      enter: theme.transitions.easing.easeOut,
      exit: theme.transitions.easing.fastOutSlowIn
    }} onExited={() => {
      onClose();
    }}>
      <Stack spacing={1} sx={{ p: "1rem" }}>
        <Error />
        <Typography variant="titleLarge">Ospiti</Typography>
        <Stack spacing={1} sx={{ pr: "1rem", pl: "1rem" }}>
          {clients.map((client) => <Client key={client.id} client={client} />)}
        </Stack>
        <Stack direction="row" justifyContent="end">
          <M3TextButton>Mostra prenotazione</M3TextButton>
        </Stack>
      </Stack>
    </Collapse>
  );
}
