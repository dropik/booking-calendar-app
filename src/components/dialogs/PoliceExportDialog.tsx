import React from "react";

import * as Api from "../../api";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

export default function PoliceExportDialog(): JSX.Element {
  return (
    <>
      <DialogHeader>Esporta Dati Polizia</DialogHeader>
      <ExportDialogBody
        onTryFetchDataAsync={(date) => Api.fetchPoliceDataAsync(date)}
        onFilenameSet={(date) => `polizia-${date}.txt`}
      />
    </>
  );
}
