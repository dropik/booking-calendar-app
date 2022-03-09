import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../redux/hooks";

import "./ConnectionError.css";

function ConnectionError(): JSX.Element {
  const saveStatus = useAppSelector((state) => state.saveChanges.status);

  if (saveStatus === "failed") {
    return <div className="connection-error">Errore di connessione</div>;
  }
  return <></>;
}

export default hot(module)(ConnectionError);
