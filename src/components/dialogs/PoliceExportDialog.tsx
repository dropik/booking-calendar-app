import React from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "react-datepicker/dist/react-datepicker.css";
import "./PoliceExportDialog.css";

function PoliceExportDialog(): JSX.Element {
  return (
    <div className="police-export-dialog">
      <h3>
        Esporta Dati Polizia
        <FontAwesomeIcon className="button close" icon={faXmark} />
      </h3>
      <hr />
      <div className="row">
        <div>
          <DatePicker
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date()}
            onChange={() => []}
          />
        </div>
        <div className="button">Esporta</div>
      </div>
    </div>
  );
}

export default hot(module)(PoliceExportDialog);
