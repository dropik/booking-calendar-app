import React, { useRef, useState } from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";
import * as Utils from "../../utils";

import "react-datepicker/dist/react-datepicker.css";
import "./PoliceExportDialog.css";

function PoliceExportDialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const ref = useRef<HTMLAnchorElement>(null);

  function preventHideOnSelfClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  function hideDialog() {
    dispatch(DialogSlice.hide());
  }

  function onDateChange(date: Date) {
    setSelectedDate(Utils.dateToString(date));
  }

  function click() {
    console.log("clicked");
  }

  function exportFile() {
    if (ref.current) {
      ref.current.click();
    }
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
            selected={new Date(selectedDate)}
            onChange={onDateChange}
          />
        </div>
        <div className="button" onClick={exportFile}>Esporta</div>
      </div>
      <a ref={ref} onClick={click}></a>
    </div>
  );
}

export default hot(module)(PoliceExportDialog);
