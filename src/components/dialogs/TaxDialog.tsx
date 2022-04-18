import React from "react";

import DialogHeader from "./DialogHeader";
import TaxDialogBody from "./TaxDialogBody";

export default function TaxDialog(): JSX.Element {
  return (
    <>
      <DialogHeader>Calcola Tassa di Soggiorno</DialogHeader>
      <TaxDialogBody />
    </>
  );
}
