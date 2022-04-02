import React from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import FindBookingDialogBody from "./FindBookingDialogBody";

type Props = {
  fadeOutDialog: () => void
};

function FindBookingDialog(props: Props): JSX.Element {
  return (
    <>
      <DialogHeader title="Cerca Prenotazione" fadeOutDialog={props.fadeOutDialog} />
      <FindBookingDialogBody />
    </>
  );
}

export default hot(module)(FindBookingDialog);
