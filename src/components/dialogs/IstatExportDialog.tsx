import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

type Props = {
  showGoBackButton?: boolean,
  fadeOutDialog: () => void
};

function IstatExportDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader title="Esporta Dati ISTAT" showGoBackButton={props.showGoBackButton} fadeOutDialog={props.fadeOutDialog} />
      <ExportDialogBody type={"istat"} fadeOutDialog={props.fadeOutDialog} />
    </>
  );
}

export default hot(module)(IstatExportDialog);
