/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Client as ClientData, fetchClientsByTile } from "../../../api";
import { show as showMessage } from "../../../redux/snackbarMessageSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { TileContext } from "../../Tile/context";

import Client from "./Client";
import Skeleton from "./Skeleton";

type ClientsProps = {
  clients: ClientData[],
  setClients: (value: ClientData[]) => void
};

export default function Clients({ clients, setClients }: ClientsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { data } = useContext(TileContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (data) {
          const response = await fetchClientsByTile(data.bookingId, data.id);
          setClients(response.data);
        }
      } catch(error: any) {
        dispatch(showMessage({ type: "error", message: error?.message }));
      }
    }

    if (clients.length === 0) {
      fetchData();
    }
  }, [data, dispatch, setClients, clients.length]);

  return (
    <>
      <Typography variant="titleLarge">Ospiti</Typography>
      <Stack spacing={1} sx={{ pr: "1rem", pl: "1rem" }}>
        {clients.length > 0 ?
          clients.map((client, index) => (
            <Client key={
              client.id && client.id.length > 0
                ? client.id
                : index
            } client={client} />
          )) :
          <Skeleton />}
      </Stack>
    </>
  );
}
