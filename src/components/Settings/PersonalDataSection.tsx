import React, { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

import { api } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { show as showSnackbarMessage } from "../../redux/snackbarMessageSlice";

import M3FilledButton from "../m3/M3FilledButton";

export default function PersonalDataSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const originalVisibleName = useAppSelector(state => state.user.visibleName);
  const [visibleName, setVisibleName] = useState<string>(originalVisibleName ?? "");
  const [updateVisibleName, updateVisibleNameResult] = api.endpoints.updateVisibleName.useMutation();

  function updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setVisibleName(event.target?.value ?? "");
  }

  function save(): void {
    updateVisibleName({ visibleName: visibleName === "" ? null : visibleName });
  }

  useEffect(() => {
    if (updateVisibleNameResult.isSuccess) {
      dispatch(showSnackbarMessage({ type: "success", message: "Salvato correttamente!" }));
      updateVisibleNameResult.reset();
    }
  }, [dispatch, updateVisibleNameResult]);

  return (
    <Stack spacing={2}>
      <Typography variant="headlineLarge">Dati personali</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          id="visibleName"
          label="Nome visualizzato"
          autoComplete="visible-name"
          value={visibleName}
          onChange={updateField}
          sx={{
            minWidth: "20rem",
          }}
        />
        {updateVisibleNameResult.isLoading
          ? <CircularProgress />
          : <M3FilledButton onClick={save}>Salva</M3FilledButton>}
      </Stack>
    </Stack>
  );
}
