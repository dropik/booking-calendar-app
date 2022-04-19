import React from "react";

import * as Api from "../../api";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

export default function IstatExportDialog(): JSX.Element {
  return (
    <>
      <DialogHeader>Esporta Dati ISTAT</DialogHeader>
      <ExportDialogBody
        onTryFetchDataAsync={(date) => Api.fetchIstatDataAsync(date)}
        onFilenameSet={(date) =>`istat-${date}.pdf`}
      />
    </>
  );
}
