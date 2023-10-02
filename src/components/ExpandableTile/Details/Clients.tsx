import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Client as ClientData } from "../../../api";

import Client from "./Client";
import Skeleton from "./Skeleton";

type ClientsProps = {
  clients: ClientData[],
  isLoading: boolean,
};

export default function Clients({ clients, isLoading }: ClientsProps): JSX.Element {
  return (
    <>
      <Typography variant="titleLarge">Ospiti</Typography>
      <Stack spacing={1} sx={{ pr: "1rem", pl: "1rem" }}>
        {!isLoading ?
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
