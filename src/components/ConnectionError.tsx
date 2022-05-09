import React from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import * as ConnectionErrorSlice from "../redux/connectionErrorSlice";

import M3Snackbar from "./m3/M3Snackbar";
import M3Alert from "./m3/M3Alert";

export default function ConnectionError(): JSX.Element {
  const dispatch = useAppDispatch();
  const showError = useAppSelector((state) => state.connectionError.showError);

  function close() {
    dispatch(ConnectionErrorSlice.hide());
  }

  return (
    <M3Snackbar open={showError} autoHideDuration={3000} onClose={close}>
      <M3Alert severity="error">Errore di connessione!</M3Alert>
    </M3Snackbar>
  );
}
