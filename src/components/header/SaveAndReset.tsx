import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { hot } from "react-hot-loader";

import "./SaveAndReset.css";

function SaveAndReset(): JSX.Element {
  return (
    <div className="save-and-reset">
      <div className="button reset">
        <FontAwesomeIcon icon={faRotateLeft} />
      </div>
      <div className="button save">Salva</div>
    </div>
  );
}

export default hot(module)(SaveAndReset);
