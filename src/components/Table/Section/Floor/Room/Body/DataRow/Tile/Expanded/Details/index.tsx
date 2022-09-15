import React from "react";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import Error from "./Error";
import Clients from "./Clients";
import ShowBookingButton from "./ShowBookingButton";

type DetailsProps = {
  open: boolean,
  onClose: () => void
};

export default function Details({ open, onClose }: DetailsProps): JSX.Element {
  const theme = useTheme();

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
        <Clients />
        <ShowBookingButton />
      </Stack>
    </Collapse>
  );
}
