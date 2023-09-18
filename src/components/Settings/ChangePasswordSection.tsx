import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { api } from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import { show as showSnackbarMessage } from "../../redux/snackbarMessageSlice";

import M3FilledButton from "../m3/M3FilledButton";

export default function ChangePasswordSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string >("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [touched, setTouched] = useState<{ oldPassword: boolean, newPassword: boolean, confirmNewPassword: boolean }>({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [updatePassword, updatePasswordResult] = api.endpoints.updatePassword.useMutation();

  const updateField = {
    oldPassword: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setOldPassword(event.target.value);
    },
    newPassword: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewPassword(event.target.value);
    },
    confirmNewPassword: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setConfirmNewPassword(event.target.value);
    },
  };

  const error = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const isValid = Object.keys(error).every(key => error[key as keyof typeof error] === "");

  if (newPassword === "") {
    error.newPassword = "Password non può essere vuota";
  }
  if (confirmNewPassword !== newPassword && confirmNewPassword !== "") {
    error.newPassword = "Le password non coincidono";
    error.confirmNewPassword = "Le password non coincidono";
  }

  const showError = {
    oldPassword: touched.oldPassword && (error.oldPassword !== ""),
    newPassword: touched.newPassword && (error.newPassword !== ""),
    confirmNewPassword: touched.confirmNewPassword && (error.confirmNewPassword !== ""),
  };

  function touchField(name: keyof typeof touched, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setTouched(prevTouched => {
      const newTouched = {...prevTouched};
      newTouched[name] = true;
      return newTouched;
    });
    updateField[name](event);
  }

  function touchForm(): void {
    setTouched(prevTouched => {
      const newTouched = {...prevTouched};
      Object.keys(newTouched).forEach(key => {
        newTouched[key as keyof typeof newTouched] = true;
      });
      return newTouched;
    });
  }

  function clearForm(): void {
    setTouched(prevTouched => {
      const newTouched = {...prevTouched};
      Object.keys(newTouched).forEach(key => {
        newTouched[key as keyof typeof newTouched] = false;
      });
      return newTouched;
    });
    setNewPassword("");
    setConfirmNewPassword("");
  }

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    touchForm();
    if (isValid) {
      updatePassword({ oldPassword, newPassword });
    }
  }

  useEffect(() => {
    if (updatePasswordResult.isSuccess) {
      dispatch(showSnackbarMessage({ type: "success", message: "La password è stata aggiornata!" }));
      clearForm();
      updatePasswordResult.reset();
    }
  }, [dispatch, updatePasswordResult]);

  return (
    <Stack spacing={2} component="form" onSubmit={submit}>
      <Typography variant="headlineLarge">Password</Typography>
      <Typography variant="bodyLarge">Qua puoi modificare la password del tuo utente</Typography>
      <TextField id="username" autoComplete="username" type="text" sx={{ display: "none" }} />
      <TextField
        id="oldPassword"
        label="Vecchia password"
        autoComplete="current-password"
        value={oldPassword}
        type="password"
        onChange={(event) => touchField("oldPassword", event)}
        sx={{
          maxWidth: "20rem",
        }}
      />
      <TextField
        id="newPassword"
        label="Nuova password"
        autoComplete="new-password"
        value={newPassword}
        error={showError.newPassword}
        helperText={showError.newPassword ? error.newPassword : undefined}
        type="password"
        onChange={(event) => touchField("newPassword", event)}
        sx={{
          maxWidth: "20rem",
        }}
      />
      <TextField
        id="confirmNewPassword"
        label="Conferma nuova password"
        autoComplete="new-password"
        value={confirmNewPassword}
        error={showError.confirmNewPassword}
        helperText={showError.confirmNewPassword ? error.confirmNewPassword : undefined}
        type="password"
        onChange={(event) => touchField("confirmNewPassword", event)}
        sx={{
          maxWidth: "20rem",
        }}
      />
      <Stack direction="row">
        {updatePasswordResult.isLoading
          ? <CircularProgress />
          : <M3FilledButton type="submit">Aggiorna password</M3FilledButton>}
      </Stack>
    </Stack>
  );
}
