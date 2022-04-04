import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

type Props = {
  data: Api.ClientData
};

function BookingDialogBodyData(props: Props): JSX.Element {
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
      <div className="bookings-container client-booking">
        <div className="row button">
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
