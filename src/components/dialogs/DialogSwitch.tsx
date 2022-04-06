import React from "react";
import { hot } from "react-hot-loader";

import * as DialogSlice from "../../redux/dialogSlice";

import BookingDialog from "./BookingDialog";
import ClientDialog from "./ClientDialog";
import FindBookingDialog from "./FindBookingDialog";
import FindClientDialog from "./FindClientDialog";
import IstatExportDialog from "./IstatExportDialog";
import PoliceExportDialog from "./PoliceExportDialog";
import TaxDialog from "./TaxDialog";

type Props = {
  dialog: DialogSlice.DialogDescriptor
};

function DialogSwitch(props: Props): JSX.Element {
  switch (props.dialog.type) {
  case "police":
    return <PoliceExportDialog />;
  case "istat":
    return <IstatExportDialog />;
  case "cityTax":
    return <TaxDialog />;
  case "booking":
    return <BookingDialog bookingId={props.dialog.id} tileId={props.dialog.tile} />;
  case "findBooking":
    return <FindBookingDialog />;
  case "client":
    return <ClientDialog bookingId={props.dialog.bookingId} clientId={props.dialog.clientId} />;
  case "findClient":
    return <FindClientDialog />;
  }
}

export default hot(module)(DialogSwitch);
