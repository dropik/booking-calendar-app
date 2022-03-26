import React, { useRef, useState } from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as DialogSlice from "../../redux/dialogSlice";
import * as Utils from "../../utils";
import * as Api from "../../api";

import "react-datepicker/dist/react-datepicker.css";
import "./PoliceExportDialog.css";

type DialogState = "fill" | "loading" | "done" | "no data";

function PoliceExportDialog(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [dialogState, setDialogState] = useState<DialogState>("fill");
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

  function exportFile() {
    async function fetchPoliceDataAsync() {
      const response = await Api.fetchPoliceDataAsync(selectedDate);
      if (("data" in response) && (ref.current)) {
        if (response.data.size > 0) {
          ref.current.href = URL.createObjectURL(response.data);
          ref.current.download = `polizia-${selectedDate}.txt`;
          ref.current.click();
          setDialogState("done");
          setTimeout(hideDialog, 1000);
        } else {
          setDialogState("no data");
          setTimeout(() => {
            setDialogState("fill");
          }, 1000);
        }
      }
    }
    fetchPoliceDataAsync();
    setDialogState("loading");
  }

  let dialogBody = <></>;
  switch (dialogState) {
  case "fill":
    dialogBody = (
      <>
        <div>
          <DatePicker
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date(selectedDate)}
            onChange={onDateChange}
          />
        </div>
        <div className="button" onClick={exportFile}>Esporta</div>
      </>
    );
    break;
  case "loading":
    dialogBody = (<div className="message">Esporto...</div>);
    break;
  case "done":
    dialogBody = (<div className="message">Fatto <FontAwesomeIcon icon={faCheck} /></div>);
    break;
  case "no data":
    dialogBody = (<div className="message">Nessun dato da esportare!</div>);
    break;
  }

  return (
    <div className="police-export-dialog" onClick={preventHideOnSelfClick}>
      <h3>
        Esporta Dati Polizia
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={hideDialog} />
      </h3>
      <hr />
      <div className="row">{dialogBody}</div>
      <a ref={ref}></a>
    </div>
  );
}

export default hot(module)(PoliceExportDialog);
