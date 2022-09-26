import React, { useState } from "react";
import Stack from "@mui/material/Stack";

import { ClientData } from "../../../api";

import DetailsCollapse from "./DetailsCollapse";
import Error from "./Error";
import Clients from "./Clients";
import ShowBookingButton from "./ShowBookingButton";

type DetailsProps = {
  open: boolean,
};

export default function Details({ open }: DetailsProps): JSX.Element {
  const [clients, setClients] = useState<ClientData[]>([]);

  return (
    <DetailsCollapse open={open}>
      <Stack spacing={1} sx={{ p: "1rem" }}>
        <Error />
        <Clients clients={clients} setClients={setClients} />
        <ShowBookingButton show={clients.length > 0} />
      </Stack>
    </DetailsCollapse>
  );
}
