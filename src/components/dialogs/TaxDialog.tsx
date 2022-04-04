import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import TaxDialogBody from "./TaxDialogBody";

type Props = {
  showGoBackButton?: boolean,
  fadeOutDialog: () => void
};

function TaxDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader title="Calcola Tassa di Soggiorno" showGoBackButton={props.showGoBackButton} fadeOutDialog={props.fadeOutDialog} />
      <TaxDialogBody fadeOutDialog={props.fadeOutDialog} />
    </>
  );
}

export default hot(module)(TaxDialog);
