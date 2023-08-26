import React from "react";

import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

import M3Dialog from "../../m3/M3Dialog";
import M3TextButton from "../../m3/M3TextButton";

type NegativePresenseDialogProps = {
  open: boolean,
  onClose: () => void,
}

export default function NegativePresenseDialog({ open, onClose }: NegativePresenseDialogProps): JSX.Element {
  const theme = useTheme();

  return (
    <M3Dialog
      open={open}
      onClose={onClose}
      heightRem={40}
      floating="right"
      transitionDuration={theme.transitions.duration.medium4}>
      <Stack direction="column" spacing={3} sx={{ p: "1.5rem", width: "30rem", alignItems: "center" }}>
        <ReportProblemOutlinedIcon />
        <Typography variant="headlineSmall">Presenze negative</Typography>
        <Typography variant="bodyMedium">Non è possibile effettuare l&apos;upload dei dati impostati, in quanto il totale delle presenze per questo giorno sarebbe inferiore di zero. Controlla i dati e riprova.</Typography>
        <Stack direction="row" width={{ width: "100%", justifyContent: "flex-end" }}>
          <M3TextButton onClick={onClose}>Ok</M3TextButton>
        </Stack>
      </Stack>
    </M3Dialog>
  );
}
