import React, { useContext } from "react";
import Stack from "@mui/material/Stack";

import ExpandableTileContext from "../context";
import M3TextButton from "../../m3/M3TextButton";

export default function ShowBookingButton(): JSX.Element | null {
  const { variant } = useContext(ExpandableTileContext);

  if (variant === "in-content") {
    return null;
  }

  return (
    <Stack direction="row" justifyContent="end">
      <M3TextButton>Mostra prenotazione</M3TextButton>
    </Stack>
  );
}
