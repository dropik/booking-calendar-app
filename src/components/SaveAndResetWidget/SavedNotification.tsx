import React, { useContext } from "react";

import { SaveAndResetWidgetContext } from ".";

import M3Alert from "../m3/M3Alert";
import M3Snackbar from "../m3/M3Snackbar";

export default function SavedNotification(): JSX.Element {
  const { status } = useContext(SaveAndResetWidgetContext);

  function resetIdle() {
    status.reset();
  }

  return (
    <M3Snackbar open={status.isSuccess} onClose={resetIdle} autoHideDuration={1000}>
      <M3Alert severity="success">Modifiche salvate!</M3Alert>
    </M3Snackbar>
  );
}
