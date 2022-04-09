import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DescriptionRow from "./DescriptionRow";
import BookingRow from "./BookingRow";

type Props = {
  data: Api.ClientData
};

function ClientDialogBodyData(props: Props): JSX.Element {
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
      <DescriptionRow name="Data di nascita" value={new Date(props.data.dateOfBirth).toLocaleDateString()} />
      <DescriptionRow name="Luogo di nascita" value={`${placeOfBirthString}${props.data.stateOfBirth}`} />
      <DescriptionRow name="Documento" value={`${documentTypeString} - ${props.data.documentNumber}`} />
      <h3 className="sub-header">Prenotazione</h3>
      <hr />
      <div className="list-container client-booking">
        <BookingRow data={props.data.booking} />
      </div>
    </>
  );
}

export default hot(module)(ClientDialogBodyData);
