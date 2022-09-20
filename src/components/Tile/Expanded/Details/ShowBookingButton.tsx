import React from "react";
import Stack from "@mui/material/Stack";

import M3TextButton from "../../../m3/M3TextButton";

export default function ShowBookingButton(): JSX.Element {
  return (
    <Stack direction="row" justifyContent="end">
      <M3TextButton>Mostra prenotazione</M3TextButton>
    </Stack>
  );
}
