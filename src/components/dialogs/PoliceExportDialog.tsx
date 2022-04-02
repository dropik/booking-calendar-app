import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

type Props = {
  fadeOutDialog: () => void
};

function PoliceExportDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader title="Esporta Dati Polizia" fadeOutDialog={props.fadeOutDialog} />
      <ExportDialogBody type={"police"} fadeOutDialog={props.fadeOutDialog} />
    </>
  );
}

export default hot(module)(PoliceExportDialog);
