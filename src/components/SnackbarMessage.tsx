import React from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hide as hideMessage } from "../redux/snackbarMessageSlice";

import M3Snackbar from "./m3/M3Snackbar";
import M3Alert from "./m3/M3Alert";

export default function SnackbarMessage(): JSX.Element {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.snackbarMessage.show);

  function close() {
    dispatch(hideMessage());
  }

  return (
    <M3Snackbar open={show} autoHideDuration={3000} onClose={close}>
      <M3Alert severity="error">Errore di connessione!</M3Alert>
    </M3Snackbar>
  );
}
