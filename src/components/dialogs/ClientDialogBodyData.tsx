import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";
import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

type Props = {
  data: Api.ClientData
};

function BookingDialogBodyData(props: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const placeOfBirthString = props.data.placeOfBirth ? "" : `${props.data.placeOfBirth}, `;

  let documentTypeString: string;
  switch (props.data.documentType) {
  case "identityCard":
    documentTypeString = "Carta d'Identità";
    break;
  case "drivingLicense":
    documentTypeString = "Patente di guida";
    break;
  case "passport":
    documentTypeString = "Passaporto";
    break;
  }

  function showBooking() {
    dispatch(DialogSlice.showBookingDialog({ id: props.data.booking.id }));
  }

  return (
    <>
      <div className="row client-data">
        <div className="field-label">Data di nascita:</div>
        <div><b>{new Date(props.data.dateOfBirth).toLocaleDateString()}</b></div>
      </div>
      <div className="row client-data">
        <div className="field-label">Luogo di nascita:</div>
        <div><b>{`${placeOfBirthString}${props.data.stateOfBirth}`}</b></div>
      </div>
      <div className="row client-data">
        <div className="field-label">Documento:</div>
        <div><b>{`${documentTypeString} - ${props.data.documentNumber}`}</b></div>
      </div>
      <h3 className="sub-header">Prenotazione</h3>
      <hr className="client-booking"/>
      <div className="list-container client-booking">
        <div className="row button" onClick={showBooking}>
          <div className="id">#{props.data.booking.id}</div>
          <div className="name">{props.data.booking.name}</div>
          <div className="from">{new Date(props.data.booking.from).toLocaleDateString()}</div>
          <div className="to">{new Date(props.data.booking.to).toLocaleDateString()}</div>
        </div>
      </div>
    </>
  );
}

export default hot(module)(BookingDialogBodyData);
