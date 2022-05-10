import React, { useContext } from "react";

import { SaveAndResetWidgetContext } from ".";

import M3Alert from "../m3/M3Alert";
import M3Snackbar from "../m3/M3Snackbar";

export default function SavedNotification(): JSX.Element {
  const { status, setStatus } = useContext(SaveAndResetWidgetContext);

  const open = status === "fulfilled";

  function resetIdle() {
    setStatus("idle");
  }

  return (
    <M3Snackbar open={open} onClose={resetIdle} autoHideDuration={1000}>
      <M3Alert severity="success">Modifiche salvate!</M3Alert>
    </M3Snackbar>
  );
}
