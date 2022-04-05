import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import ClientsList from "./ClientsList";

import "./DialogWithList.css";

function FindClientDialogBody(): JSX.Element {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [forceFetchRequest, setForceFetchRequest] = useState(0);
  const [isLiveUpdateEnabled, setLiveUpdateEnabled] = useState(false);

  const isValidated = (name.length > 0) || (surname.length > 0);
  const showError = !isValidated && isLiveUpdateEnabled;
  const inputClassName = !showError ? "" : "invalid";

  const errorLabel = !showError ?
    <></> :
    (
      <div className="error-label">
        <FontAwesomeIcon icon={faCircleExclamation} />
        Almeno uno dei campi deve essere non vuoto
      </div>
    );

  return (
    <>
      {errorLabel}
      <div className="row form-input">
        <div>
          <label htmlFor="name" className="label">Nome:</label>
          <input type={"text"} id="name" className={inputClassName} value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
            setLiveUpdateEnabled(true);
          }} />
        </div>
        <div>
          <label htmlFor="surname" className="label">Cognome:</label>
          <input type={"text"} id="surname" className={inputClassName} value={surname} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSurname(event.target.value);
            setLiveUpdateEnabled(true);
          }} />
        </div>
        <div className="button" onClick={() => {
          setForceFetchRequest(forceFetchRequest + 1);
          setLiveUpdateEnabled(true);
        }}>Cerca</div>
      </div>
      <hr className="search-field-border" />
      <div className="list-container">
        <div className="row list-header">
          <div className="first-name">Nome</div>
          <div className="last-name">Cognome</div>
          <div className="date-of-birth">DN</div>
          <div className="booking-name">Prenotazione</div>
        </div>
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
