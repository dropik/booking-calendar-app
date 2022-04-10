import React, { useContext, useRef, useState } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import * as Api from "../../api";
import { DialogContainerContext } from "./DialogContainer";

import ButtonInput from "./ButtonInput";
import DateInput from "./DateInput";

type DialogState = "fill" | "loading" | "done" | "no data";

type Props = {
  type: "police" | "istat"
}

function ExportDialogBody({ type }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [dialogState, setDialogState] = useState<DialogState>("fill");
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const context = useContext(DialogContainerContext);

  let getDataAsync: () => Promise<Blob>;
  let filename: string;

  switch (type) {
  case "police":
    getDataAsync = async () => {
      const response = await Api.fetchPoliceDataAsync(selectedDate);
      return response.data;
    };
    filename = `polizia-${selectedDate}.txt`;
    break;
  case "istat":
    getDataAsync = async () => {
      const response = await Api.fetchIstatDataAsync(selectedDate);
      return response.data;
    };
    filename = `istat-${selectedDate}.pdf`;
    break;
  }

  function exportFile() {
    async function fetchDataAsync() {
      try {
        const data = await getDataAsync();
        if (anchorRef.current) {
          if (data && data.size > 0) {
            anchorRef.current.href = URL.createObjectURL(data);
            anchorRef.current.download = filename;
            anchorRef.current.click();

            setDialogState("done");
            setTimeout(context.fadeOutDialog, 1000);
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

  let dialogRow = <></>;
  switch (dialogState) {
  case "fill":
    dialogRow = (
      <>
        <DateInput value={selectedDate} onChange={setSelectedDate} />
        <ButtonInput onClick={exportFile}>Esporta</ButtonInput>
      </>
    );
    break;
  case "loading":
    dialogRow = (<div className="message">Esporto...</div>);
    break;
  case "done":
    dialogRow = (<div className="message">Fatto <FontAwesomeIcon icon={faCheck} /></div>);
    break;
  case "no data":
    dialogRow = (<div className="message">Nessun dato da esportare!</div>);
    break;
  }

  return (
    <>
      <div className="row">{dialogRow}</div>
      <a ref={anchorRef}></a>
    </>
  );
}

export default hot(module)(ExportDialogBody);
