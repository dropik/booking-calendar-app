import React from "react";
import { hot } from "react-hot-loader";

import * as Api from "../../api";

import DescriptionRow from "./DescriptionRow";
import BookingButtonRow from "./BookingButtonRow";

type Props = {
  data: Api.ClientData
};

function ClientDialogBody({ data }: Props): JSX.Element {
  const dateOfBirthString = new Date(data.dateOfBirth).toLocaleDateString();
  const placeOfBirthString = getFullPlaceOfBirthString(data.stateOfBirth, data.placeOfBirth);
  const documentString = getFullDocumentString(data.documentType, data.documentNumber);

  return (
    <div className="client-dialog-body">
      <DescriptionRow name="Data di nascita" value={dateOfBirthString} />
      <DescriptionRow name="Luogo di nascita" value={placeOfBirthString} />
      <DescriptionRow name="Documento" value={documentString} />
      <h3 className="sub-header">Prenotazione</h3>
      <hr />
      <div className="list-container">
        <BookingButtonRow data={data.booking} />
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
