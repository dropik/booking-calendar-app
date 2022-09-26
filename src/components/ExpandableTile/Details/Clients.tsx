import React, { useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ClientShortData, fetchClientsByTile } from "../../../api";
import { show as showMessage } from "../../../redux/snackbarMessageSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { TileContext } from "../../Tile/context";

import Client from "./Client";

export default function Clients(): JSX.Element {
  const dispatch = useAppDispatch();
  const { data } = useContext(TileContext);
  const [clients, setClients] = useState<ClientShortData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchClientsByTile(data.id);
        setClients(response.data);
      } catch(error) {
        dispatch(showMessage({ type: "error" }));
      }
    }
    fetchData();
  }, [data.id, dispatch]);

  return (
    <>
      <Typography variant="titleLarge">Ospiti</Typography>
      <Stack spacing={1} sx={{ pr: "1rem", pl: "1rem" }}>
        {clients.map((client) => <Client key={client.id} client={client} />)}
      </Stack>
    </>
  );
}
