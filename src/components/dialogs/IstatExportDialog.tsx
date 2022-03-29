import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import ExportDialogBody from "./ExportDialogBody";

type Props = {
  fadeOutDialog: () => void
};

function IstatExportDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader type={"istat"} fadeOutDialog={props.fadeOutDialog} />;
      <ExportDialogBody type={"istat"} fadeOutDialog={props.fadeOutDialog} />
    </>
  );
}

export default hot(module)(IstatExportDialog);
