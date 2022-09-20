import React, { useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ClientShortData, fetchClientsByTile } from "../../../../api";
import { TileContext } from "../../context";

import Client from "./Client";

export default function Clients(): JSX.Element {
  const { data } = useContext(TileContext);
  const [clients, setClients] = useState<ClientShortData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchClientsByTile(data.id);
      setClients(response.data);
    }
    fetchData().catch();
  }, [data.id]);

  return (
    <>
      <Typography variant="titleLarge">Ospiti</Typography>
      <Stack spacing={1} sx={{ pr: "1rem", pl: "1rem" }}>
        {clients.map((client) => <Client key={client.id} client={client} />)}
      </Stack>
    </>
  );
}
