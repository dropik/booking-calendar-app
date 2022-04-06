import React, { memo } from "react";
import { hot } from "react-hot-loader";

import DialogHeader from "./DialogHeader";
import FindBookingDialogBody from "./FindBookingDialogBody";

function FindBookingDialog(): JSX.Element {
  return (
    <div className="scrollable">
      <DialogHeader title="Cerca Prenotazione" />
      <FindBookingDialogBody />
    </div>
  );
}

export default memo(hot(module)(FindBookingDialog));
