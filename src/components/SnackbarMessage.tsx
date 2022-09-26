import React from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hide as hideMessage } from "../redux/snackbarMessageSlice";

import M3Snackbar from "./m3/M3Snackbar";
import M3Alert from "./m3/M3Alert";

export default function SnackbarMessage(): JSX.Element {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.snackbarMessage.message);
  const open = useAppSelector((state) => state.snackbarMessage.show);

  function close() {
    dispatch(hideMessage());
  }

  return (
    <>
      <M3Snackbar open={open} autoHideDuration={3000} onClose={close}>
        <M3Alert severity={message.type}>{message.message ? message.message : "Errore di conessione!"}</M3Alert>
      </M3Snackbar>
    </>
  );
}
