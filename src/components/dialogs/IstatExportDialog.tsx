import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

function IstatExportDialog(): JSX.Element {
  return (
    <>
      <DialogHeader>Esporta Dati ISTAT</DialogHeader>
      <ExportDialogBody type={"istat"} />
    </>
  );
}

export default hot(module)(IstatExportDialog);
