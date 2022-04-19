import React, { memo } from "react";

import DialogHeader from "./DialogHeader";
import FindBookingDialogBody from "./FindBookingDialogBody";

export default memo(function FindBookingDialog(): JSX.Element {
  return (
    <div className="scrollable">
      <DialogHeader>Cerca Prenotazione</DialogHeader>
      <FindBookingDialogBody />
    </div>
  );
});
