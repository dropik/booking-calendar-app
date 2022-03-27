import React, { useRef, useState } from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as DialogSlice from "../../redux/dialogSlice";
import * as Utils from "../../utils";
import * as Api from "../../api";

import "react-datepicker/dist/react-datepicker.css";
import "./ExportDialog.css";

type DialogState = "fill" | "loading" | "done" | "no data";

type Props = {
  type: DialogSlice.DialogType,
  dialogRef: React.RefObject<HTMLDivElement>,
  fadeOutDialog: () => void,
  onAnimationEnd: () => void
}

function ExportDialog(props: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [dialogState, setDialogState] = useState<DialogState>("fill");
  const anchorRef = useRef<HTMLAnchorElement>(null);

  function preventHideOnSelfClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  function onDateChange(date: Date) {
    setSelectedDate(Utils.dateToString(date));
  }

  let getBlobAsync: () => Promise<Blob>;
  let filename: string;
  let title: string;

  switch (props.type) {
  case "police":
    getBlobAsync = async () => {
      const response = await Api.fetchPoliceDataAsync(selectedDate);
      return response.data;
    };
    filename = `polizia-${selectedDate}.txt`;
    title = "Esporta Dati Polizia";
    break;
  case "istat":
    getBlobAsync = async () => {
      const response = await Api.fetchIstatDataAsync(selectedDate);
      return response.data;
    };
    filename = `istat-${selectedDate}.pdf`;
    title = "Esporta Dati ISTAT";
    break;
  }

  function exportFile() {
    async function fetchDataAsync() {
      try {
        const data = await getBlobAsync();
        if (anchorRef.current) {
          if (data && data.size > 0) {
            anchorRef.current.href = URL.createObjectURL(data);
            anchorRef.current.download = filename;
            anchorRef.current.click();

            setDialogState("done");
            setTimeout(props.fadeOutDialog, 1000);
          } else {
            setDialogState("no data");
            setTimeout(() => { setDialogState("fill"); }, 1000);
          }
        }
      } catch (error) {
        dispatch(ConnectionErrorSlice.show());
        setDialogState("fill");
      }
    }
    fetchDataAsync();
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
    <div
      ref={props.dialogRef}
      className="export-dialog show"
      onClick={preventHideOnSelfClick}
      onAnimationEnd={props.onAnimationEnd}
    >
      <h3>
        {title}
        <FontAwesomeIcon className="button close" icon={faXmark} onClick={props.fadeOutDialog} />
      </h3>
      <hr />
      <div className="row">{dialogBody}</div>
      <a ref={anchorRef}></a>
    </div>
  );
}

export default hot(module)(ExportDialog);
