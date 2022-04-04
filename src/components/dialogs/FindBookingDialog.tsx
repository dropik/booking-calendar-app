import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import FindBookingDialogBody from "./FindBookingDialogBody";

type Props = {
  showGoBackButton?: boolean,
  fadeOutDialog: () => void
};

function FindBookingDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader title="Cerca Prenotazione" showGoBackButton={props.showGoBackButton} fadeOutDialog={props.fadeOutDialog} />
      <FindBookingDialogBody />
    </>
  );
}

export default hot(module)(FindBookingDialog);
