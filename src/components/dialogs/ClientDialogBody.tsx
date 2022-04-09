import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DescriptionRow from "./DescriptionRow";
import BookingRow from "./BookingRow";

type Props = {
  data: Api.ClientData
};

function ClientDialogBody(props: Props): JSX.Element {
  const dateOfBirthString = new Date(props.data.dateOfBirth).toLocaleDateString();
  const placeOfBirthString = getFullPlaceOfBirthString(props.data.stateOfBirth, props.data.placeOfBirth);
  const documentString = getFullDocumentString(props.data.documentType, props.data.documentNumber);

  return (
    <div className="client-dialog-body">
      <DescriptionRow name="Data di nascita" value={dateOfBirthString} />
      <DescriptionRow name="Luogo di nascita" value={placeOfBirthString} />
      <DescriptionRow name="Documento" value={documentString} />
      <h3 className="sub-header">Prenotazione</h3>
      <hr />
      <div className="list-container">
        <BookingRow data={props.data.booking} />
      </div>
    </div>
  );
}

function getFullPlaceOfBirthString(stateOfBirth: string, placeOfBirth: string): string {
  return `${placeOfBirth}${placeOfBirth.length === 0 ? "" : ", "}${stateOfBirth}`;
}

function getFullDocumentString(documentType: Api.DocumentType, documentNumber: string): string {
  return `${getDocumentTypeString(documentType)} - ${documentNumber}`;
}

function getDocumentTypeString(type: Api.DocumentType): string {
  switch (type) {
  case "identityCard":
    return "Carta d'Identità";
  case "drivingLicense":
    return "Patente di guida";
  case "passport":
    return "Passaporto";
  }
}

export default hot(module)(ClientDialogBody);
