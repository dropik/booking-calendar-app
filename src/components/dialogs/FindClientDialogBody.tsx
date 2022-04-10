import React, { useState } from "react";
import { hot } from "react-hot-loader";

import FindDialogBody from "./FindDialogBody";
import LabeledTextInput from "./LabeledTextInput";
import ClientRowContent from "./ClientRowContent";
import ClientsList from "./ClientsList";

function FindClientDialogBody(): JSX.Element {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const isValidated = (name.length > 0) || (surname.length > 0);

  return (
    <FindDialogBody
      isValidated={isValidated}
      errorText="Almeno uno dei campi deve essere non vuoto"
      formInputs={(showError) => (
        <>
          <LabeledTextInput id="name" label="Nome" isValid={!showError} value={name} onChange={setName} />
          <LabeledTextInput id="surname" label="Cognome" isValid={!showError} value={surname} onChange={setSurname} />
        </>
      )}
      header={() => <ClientRowContent client={{ name: "Nome", surname: "Cognome", dateOfBirth: "DN" }} bookingName="Prenotazione" />}
      list={() => <ClientsList name={name} surname={surname} />}
    />
  );
}

export default hot(module)(FindClientDialogBody);
