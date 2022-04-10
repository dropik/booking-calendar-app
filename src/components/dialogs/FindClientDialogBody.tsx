import React, { useState } from "react";
import { hot } from "react-hot-loader";

import ErrorLabel from "./ErrorLabel";
import LabeledTextInput from "./LabeledTextInput";
import ButtonInput from "./ButtonInput";
import HeaderRow from "./HeaderRow";
import ClientRowContent from "./ClientRowContent";
import ClientsList from "./ClientsList";

import "./DialogWithList.css";

function FindClientDialogBody(): JSX.Element {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [forceFetchRequest, setForceFetchRequest] = useState(0);
  const [isLiveUpdateEnabled, setLiveUpdateEnabled] = useState(false);

  const isValidated = (name.length > 0) || (surname.length > 0);
  const showError = !isValidated && isLiveUpdateEnabled;

  return (
    <>
      <ErrorLabel show={showError} text="Almeno uno dei campi deve essere non vuoto" />
      <div className="row form-input">
        <LabeledTextInput id="name" label="Nome" isValid={!showError} value={name} onChange={setName} />
        <LabeledTextInput id="surname" label="Cognome" isValid={!showError} value={surname} onChange={setSurname} />
        <ButtonInput onClick={() => setForceFetchRequest(forceFetchRequest + 1)}>Cerca</ButtonInput>
      </div>
      <hr className="search-field-border" />
      <div className="list-container">
        <HeaderRow>
          <ClientRowContent client={{ name: "Nome", surname: "Cognome", dateOfBirth: "DN" }} bookingName="Prenotazione" />
        </HeaderRow>
        <ClientsList
          name={name}
          surname={surname}
          forceFetchRequest={forceFetchRequest}
          isLiveUpdateEnabled={isLiveUpdateEnabled}
          isValidated={isValidated}
        />
      </div>
    </>
  );
}

export default hot(module)(FindClientDialogBody);
