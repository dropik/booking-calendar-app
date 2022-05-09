import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as ConnectionErrorSlice from "../redux/connectionErrorSlice";

export default function ConnectionError(): JSX.Element {
  const dispatch = useAppDispatch();
  const showError = useAppSelector((state) => state.connectionError.showError);

  function close() {
    dispatch(ConnectionErrorSlice.hide());
  }

  return (
    <Snackbar
      open={showError}
      autoHideDuration={3000}
      onClose={close}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error">Errore di connessione!</Alert>
    </Snackbar>
  );
}
