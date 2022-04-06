import React, { memo } from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import FindBookingDialogBody from "./FindBookingDialogBody";

function FindBookingDialog(): JSX.Element {
  return (
    <>
      <DialogHeader title="Cerca Prenotazione" />
      <FindBookingDialogBody />
    </>
  );
}

export default memo(hot(module)(FindBookingDialog));
