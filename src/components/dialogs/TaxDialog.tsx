import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import TaxDialogBody from "./TaxDialogBody";

type Props = {
  fadeOutDialog: () => void
};

function TaxDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader type={"cityTax"} fadeOutDialog={props.fadeOutDialog} />
      <TaxDialogBody fadeOutDialog={props.fadeOutDialog} />
    </>
  );
}

export default hot(module)(TaxDialog);