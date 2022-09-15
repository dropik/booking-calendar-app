import React from "react";
import Stack from "@mui/material/Stack";


import DetailsCollapse from "./DetailsCollapse";
import Error from "./Error";
import Clients from "./Clients";
import ShowBookingButton from "./ShowBookingButton";

type DetailsProps = {
  open: boolean,
};

export default function Details({ open }: DetailsProps): JSX.Element {
  return (
    <DetailsCollapse open={open}>
      <Stack spacing={1} sx={{ p: "1rem" }}>
        <Error />
        <Clients />
        <ShowBookingButton />
      </Stack>
    </DetailsCollapse>
  );
}
