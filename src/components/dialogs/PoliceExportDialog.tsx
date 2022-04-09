import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

function PoliceExportDialog(): JSX.Element {
  return (
    <>
      <DialogHeader>Esporta Dati Polizia</DialogHeader>
      <ExportDialogBody type={"police"} />
    </>
  );
}

export default hot(module)(PoliceExportDialog);
