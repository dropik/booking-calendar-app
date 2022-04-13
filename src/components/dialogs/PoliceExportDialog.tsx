import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

function PoliceExportDialog(): JSX.Element {
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

export default hot(module)(PoliceExportDialog);
