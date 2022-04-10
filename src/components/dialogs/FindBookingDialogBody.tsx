import React, { createContext, useCallback, useState } from "react";
import { hot } from "react-hot-loader";

import * as Utils from "../../utils";
import { useCurrentDate } from "../../redux/hooks";

import ErrorLabel from "./ErrorLabel";
import LabeledTextInput from "./LabeledTextInput";
import LabeledDateInput from "./LabeledDateInput";
import ButtonInput from "./ButtonInput";
import BookingsList from "./BookingsList";

import "./DialogWithList.css";

export type FindBookingDialogContextType = {
  enableLiveUpdate: () => void,
  forceFetchRequest: number,
  isLiveUpdateEnabled: boolean,
  isValidated: boolean
};

export const FindBookingDialogContext = createContext<FindBookingDialogContextType>({
  enableLiveUpdate: () => void 0,
  forceFetchRequest: 0,
  isLiveUpdateEnabled: false,
  isValidated: true
});

function FindBookingDialogBody(): JSX.Element {
  const currentDate = useCurrentDate();
  const toDateObj = new Date(currentDate);
  toDateObj.setMonth(toDateObj.getMonth() + 1);
  const [nameOrId, setNameOrId] = useState("");
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(Utils.dateToString(toDateObj));
  const [forceFetchRequest, setForceFetchRequest] = useState(0);
  const [isLiveUpdateEnabled, setLiveUpdateEnabled] = useState(false);
  const enableLiveUpdate = useCallback(() => setLiveUpdateEnabled(true), []);

  const isValidated = Utils.daysBetweenDates(fromDate, toDate) > 0;
  const context: FindBookingDialogContextType = { enableLiveUpdate, forceFetchRequest, isLiveUpdateEnabled, isValidated };

  return (
    <FindBookingDialogContext.Provider value={context}>
      <ErrorLabel show={!isValidated} text="Intervallo selezionato non corretto" />
      <div className="row form-input">
        <LabeledTextInput id="nameOrId" name="Nome / ID" value={nameOrId} onChange={setNameOrId} />
        <LabeledDateInput id="from" name="Dal" isValid={isValidated} value={fromDate} onChange={setFromDate} />
        <LabeledDateInput id="to" name="Al" isValid={isValidated} value={toDate} onChange={setToDate} />
        <ButtonInput onClick={() => setForceFetchRequest(forceFetchRequest + 1)}>Cerca</ButtonInput>
      </div>
      <hr className="search-field-border" />
      <div className="list-container">
        <div className="row list-header">
          <div className="id">ID</div>
          <div className="name">Nome</div>
          <div className="from">Dal</div>
          <div className="to">Al</div>
        </div>
        <BookingsList nameOrId={nameOrId} from={fromDate} to={toDate} />
      </div>
    </FindBookingDialogContext.Provider>
  );
}

export default hot(module)(FindBookingDialogBody);
