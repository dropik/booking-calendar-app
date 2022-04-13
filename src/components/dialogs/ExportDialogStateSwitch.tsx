import React, { ReactNode } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { ExportDialogState } from "./ExportDialogBody";

type Props = {
  children: ReactNode,
  state: ExportDialogState
};

function ExportDialogStateSwitch({ children, state }: Props): JSX.Element {
  switch (state) {
  case "fill":
    return <>{children}</>;
  case "loading":
    return <div className="message">Esporto...</div>;
  case "done":
    return <div className="message">Fatto <FontAwesomeIcon icon={faCheck} /></div>;
  case "no data":
    return <div className="message">Nessun dato da esportare!</div>;
  }
}

export default hot(module)(ExportDialogStateSwitch);
