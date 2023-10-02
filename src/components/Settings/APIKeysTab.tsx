import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { api } from "../../api";
import { Utils } from "../../utils";

import M3Divider from "../m3/M3Divider";
import M3FilledButton from "../m3/M3FilledButton";
import M3Dialog from "../m3/M3Dialog";
import M3TextButton from "../m3/M3TextButton";

export default function APIKeysTab(): JSX.Element {
  const { data: originalApiKeys, isSuccess: isLoaded } = api.endpoints.getStructureApiKeys.useQuery(null);
  const [updateApiKeys, updateApiKeysResult] = api.endpoints.updateApiKeys.useMutation();

  const [iperbookingHotel, setIperbookingHotel] = useState(originalApiKeys?.iperbookingHotel ?? "");
  const [iperbookingUsername, setIperbookingUsername] = useState(originalApiKeys?.iperbookingUsername ?? "");
  const [iperbookingPassword, setIperbookingPassword] = useState(originalApiKeys?.iperbookingPassword ?? "");
  const [asUsername, setAsUsername] = useState(originalApiKeys?.asUtente ?? "");
  const [asPassword, setAsPassword] = useState(originalApiKeys?.asPassword ?? "");
  const [asWsKey, setAsWsKey] = useState(originalApiKeys?.asWsKey ?? "");
  const [c59Struttura, setC59Struttura] = useState(originalApiKeys?.c59Struttura ?? 0);
  const [c59Username, setC59Username] = useState(originalApiKeys?.c59Username ?? "");
  const [c59Password, setC59Password] = useState(originalApiKeys?.c59Password ?? "");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIperbookingHotel(originalApiKeys.iperbookingHotel);
      setIperbookingUsername(originalApiKeys.iperbookingUsername);
      setIperbookingPassword(originalApiKeys.iperbookingPassword);
      setAsUsername(originalApiKeys.asUtente);
      setAsPassword(originalApiKeys.asPassword);
      setAsWsKey(originalApiKeys.asWsKey);
      setC59Struttura(originalApiKeys.c59Struttura);
      setC59Username(originalApiKeys.c59Username);
      setC59Password(originalApiKeys.c59Password);
    }
  }, [isLoaded, originalApiKeys]);

  function send(): void {
    updateApiKeys({
      iperbookingHotel,
      iperbookingUsername,
      iperbookingPassword,
      asUtente: asUsername,
      asPassword,
      asWsKey,
      c59Struttura,
      c59Username,
      c59Password,
    });
    setOpenConfirmDialog(false);
  }

  return (
    <Stack spacing={4}>
      <Stack sx={{ alignItems: "center", pt: "1rem" }}>
        <WarningAmberRoundedIcon fontSize="large" />
        <Typography variant="headlineMedium">
          Attenzione a modificare le seguenti credenziali!
        </Typography>
        <Typography variant="bodyLarge" textAlign="center" sx={{ maxWidth: "50rem" }}>
          Sono essenziali per il corretto funzionamento del sistema. Consulta le pagine dei relativi servizi per ottenere le credenziali corretti per la tua struttura.
        </Typography>
      </Stack>
      <Stack spacing={2} sx={{ maxWidth: "30rem" }}>
        <Typography variant="headlineLarge">Iperbooking</Typography>
        <TextField
          id="iperbookingHotel"
          label="Hotel"
          value={iperbookingHotel}
          onChange={event => setIperbookingHotel(event.target.value)}
        />
        <TextField
          id="iperbookingUsername"
          label="Username"
          value={iperbookingUsername}
          onChange={event => setIperbookingUsername(event.target.value)}
        />
        <TextField
          id="iperbookingPassword"
          label="Password"
          value={iperbookingPassword}
          onChange={event => setIperbookingPassword(event.target.value)}
        />
      </Stack>
      <M3Divider />
      <Stack spacing={2} sx={{ maxWidth: "30rem" }}>
        <Typography variant="headlineLarge">Polizia di Stato</Typography>
        <TextField
          id="asUsername"
          label="Username"
          value={asUsername}
          onChange={event => setAsUsername(event.target.value)}
        />
        <TextField
          id="asPassword"
          label="Password"
          value={asPassword}
          onChange={event => setAsPassword(event.target.value)}
        />
        <TextField
          id="asWsKey"
          label="WsKey"
          value={asWsKey}
          helperText="Consulta la pagina del portale alloggiati per generare il WsKey"
          onChange={event => setAsWsKey(event.target.value)}
        />
      </Stack>
      <M3Divider />
      <Stack spacing={2} sx={{ maxWidth: "30rem" }}>
        <Typography variant="headlineLarge">ISTAT</Typography>
        <TextField
          id="c59Struttura"
          label="Struttura"
          type="number"
          value={c59Struttura}
          onChange={event => setC59Struttura(Number.parseInt(event.target.value))}
          sx={{
            "& input": {
              MozAppearance: "textfield",
            },
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
            },
          }}
        />
        <TextField
          id="c59Username"
          label="Username"
          value={c59Username}
          onChange={event => setC59Username(event.target.value)}
        />
        <TextField
          id="c59Password"
          label="Password"
          value={c59Password}
          onChange={event => setC59Password(event.target.value)}
        />
      </Stack>
      <Stack direction="row" sx={{ pt: "2rem" }}>
        {updateApiKeysResult.isLoading
          ? <CircularProgress />
          : <M3FilledButton onClick={() => setOpenConfirmDialog(true)}>Salva modifiche</M3FilledButton>}
      </Stack>
      <M3Dialog
        floating="left"
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        heightRem={-Utils.pxToRem(window.innerHeight) + 50}
      >
        <Stack spacing={3} sx={{ p: "1.5rem", maxWidth: "30rem" }}>
          <Stack spacing={2} alignItems="center">
            <WarningAmberRoundedIcon fontSize="large" />
            <Typography variant="headlineSmall">Salvare le modifiche?</Typography>
            <Typography variant="bodyMedium">Le credenziali inseriti non correttamente non permetterranno al sistema di eseguire le certe azioni. Vuoi procedere?</Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <M3TextButton onClick={() => setOpenConfirmDialog(false)}>No</M3TextButton>
            <M3TextButton onClick={send}>Sì</M3TextButton>
          </Stack>
        </Stack>
      </M3Dialog>
    </Stack>
  );
}
