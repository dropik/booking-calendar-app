import React from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";

import "react-datepicker/dist/react-datepicker.css";
import "./PoliceExportDialog.css";

function PoliceExportDialog(): JSX.Element {
  const dispatch = useAppDispatch();

  function preventHideOnSelfClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  function hideDialog() {
    dispatch(DialogSlice.hide());
  }

  return (
    <div className="police-export-dialog" onClick={preventHideOnSelfClick}>
      <h3>
        Esporta Dati Polizia
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={hideDialog} />
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
