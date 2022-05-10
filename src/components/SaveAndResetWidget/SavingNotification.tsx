import React, { useContext } from "react";

import { SaveAndResetWidgetContext } from ".";

import M3Alert from "../m3/M3Alert";
import M3Snackbar from "../m3/M3Snackbar";

export default function SavingNotification(): JSX.Element {
  const { status } = useContext(SaveAndResetWidgetContext);

  const open = status === "loading";

  return (
    <M3Snackbar open={open}>
      <M3Alert severity="info">Salviamo modifiche...</M3Alert>
    </M3Snackbar>
  );
}
