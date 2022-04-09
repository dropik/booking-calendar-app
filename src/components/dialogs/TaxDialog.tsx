import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import TaxDialogBody from "./TaxDialogBody";

function TaxDialog(): JSX.Element {
  return (
    <>
      <DialogHeader>Calcola Tassa di Soggiorno</DialogHeader>
      <TaxDialogBody />
    </>
  );
}

export default hot(module)(TaxDialog);
