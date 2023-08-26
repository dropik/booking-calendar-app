import React from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import M3Dialog from "../../m3/M3Dialog";
import M3TextButton from "../../m3/M3TextButton";

type ConfirmExitDialogProps = {
  open: boolean,
  onCancel: () => void,
  onConfirm: () => void,
}

export default function ConfirmExitDialog({ open, onCancel, onConfirm }: ConfirmExitDialogProps): JSX.Element {
  const theme = useTheme();

  function confirm(): void {
    onCancel();
    onConfirm();
  }

  return (
    <M3Dialog
      open={open}
      onClose={onCancel}
      heightRem={40}
      floating="left"
      transitionDuration={theme.transitions.duration.medium4}
    >
      <Stack direction="column" spacing={3} sx={{ p: "1.5rem", minWidth: "20rem", alignItems: "center" }}>
        <Typography variant="headlineSmall">Uscire?</Typography>
        <Typography variant="bodyMedium" width="100%">Le modifiche effettuate non verranno salvate.</Typography>
        <Stack direction="row" spacing={1} sx={{
          width: "100%",
          justifyContent: "flex-end",
        }}>
          <M3TextButton onClick={onCancel}>No</M3TextButton>
          <M3TextButton onClick={confirm}>Sì</M3TextButton>
        </Stack>
      </Stack>
    </M3Dialog>
  );
}
