import React, { useContext, useRef, useState } from "react";
import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as ConnectionErrorSlice from "../../redux/connectionErrorSlice";
import { DialogContainerContext } from "./DialogContainer";

import ExportDialogStateSwitch from "./ExportDialogStateSwitch";
import ButtonInput from "./ButtonInput";
import DateInput from "./DateInput";

export type ExportDialogState = "fill" | "loading" | "done" | "no data";

type Props = {
  onTryFetchDataAsync: (date: string) => Promise<{ data: Blob }>,
  onFilenameSet: (date: string) => string
};

export default function ExportDialogBody({ onTryFetchDataAsync, onFilenameSet }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [dialogState, setDialogState] = useState<ExportDialogState>("fill");
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const context = useContext(DialogContainerContext);

  function exportFile() {
    async function fetchDataAsync() {
      try {
        const response = await onTryFetchDataAsync(selectedDate);
        const data = response.data;
        if (anchorRef.current) {
          if (data && data.size > 0) {
            anchorRef.current.href = URL.createObjectURL(data);
            anchorRef.current.download = onFilenameSet(selectedDate);
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

  return (
    <>
      <div className="row">
        <ExportDialogStateSwitch state={dialogState}>
          <DateInput value={selectedDate} onChange={setSelectedDate} />
          <ButtonInput onClick={exportFile}>Esporta</ButtonInput>
        </ExportDialogStateSwitch>
      </div>
      <a ref={anchorRef}></a>
    </>
  );
}
