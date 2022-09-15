import React from "react";
import Stack from "@mui/material/Stack";

import DetailsCollapse from "./DetailsCollapse";
import Error from "./Error";
import Clients from "./Clients";
import ShowBookingButton from "./ShowBookingButton";

type DetailsProps = {
  open: boolean,
  onClose: () => void
};

export default function Details({ open, onClose }: DetailsProps): JSX.Element {

  return (
    <DetailsCollapse open={open} onClose={onClose}>
      <Stack spacing={1} sx={{ p: "1rem" }}>
        <Error />
        <Clients />
        <ShowBookingButton />
      </Stack>
    </DetailsCollapse>
  );
}
