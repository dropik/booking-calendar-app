import React, { useState } from "react";

import * as Utils from "../../utils";
import { useCurrentDate } from "../../redux/hooks";

import FindDialogBody from "./FindDialogBody";
import LabeledTextInput from "./LabeledTextInput";
import LabeledDateInput from "./LabeledDateInput";
import BookingRowContent from "./BookingRowContent";
import BookingsList from "./BookingsList";

export default function FindBookingDialogBody(): JSX.Element {
  const currentDate = useCurrentDate();
  const toDateObj = new Date(currentDate);
  toDateObj.setMonth(toDateObj.getMonth() + 1);
  const [nameOrId, setNameOrId] = useState("");
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(Utils.dateToString(toDateObj));

  const isValidated = Utils.daysBetweenDates(fromDate, toDate) > 0;

  return (
    <FindDialogBody
      isValidated={isValidated}
      errorText="Intervallo selezionato non corretto"
      formInputs={(showError) => (
        <>
          <LabeledTextInput id="nameOrId" label="Nome / ID" value={nameOrId} onChange={setNameOrId} />
          <LabeledDateInput id="from" label="Dal" isValid={!showError} value={fromDate} onChange={setFromDate} />
          <LabeledDateInput id="to" label="Al" isValid={!showError} value={toDate} onChange={setToDate} />
        </>
      )}
      header={() => <BookingRowContent data={{ id: "ID", name: "Nome", from: "Dal", to: "Al" }} />}
      list={() => <BookingsList nameOrId={nameOrId} from={fromDate} to={toDate} />}
    />
  );
}
