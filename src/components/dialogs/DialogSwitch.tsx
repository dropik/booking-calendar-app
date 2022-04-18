import React from "react";

import * as DialogSlice from "../../redux/dialogSlice";

import BookingByIdDialog from "./BookingByIdDialog";
import BookingByTileIdDialog from "./BookingByTileIdDialog";
import ClientDialog from "./ClientDialog";
import FindBookingDialog from "./FindBookingDialog";
import FindClientDialog from "./FindClientDialog";
import IstatExportDialog from "./IstatExportDialog";
import PoliceExportDialog from "./PoliceExportDialog";
import TaxDialog from "./TaxDialog";

type Props = {
  dialog: DialogSlice.DialogDescriptor
};

export default function DialogSwitch({ dialog }: Props): JSX.Element {
  switch (dialog.type) {
  case "police":
    return <PoliceExportDialog />;
  case "istat":
    return <IstatExportDialog />;
  case "cityTax":
    return <TaxDialog />;
  case "booking":
    if ("id" in dialog) {
      return <BookingByIdDialog id={dialog.id} />;
    } else {
      return <BookingByTileIdDialog tileId={dialog.tile} />;
    }
  case "findBooking":
    return <FindBookingDialog />;
  case "client":
    return <ClientDialog bookingId={dialog.bookingId} clientId={dialog.clientId} />;
  case "findClient":
    return <FindClientDialog />;
  }
}
