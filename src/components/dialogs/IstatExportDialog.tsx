import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

function IstatExportDialog(): JSX.Element {
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

export default hot(module)(IstatExportDialog);
