import React, { useState } from "react";
import { hot } from "react-hot-loader";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import * as Utils from "../../utils";
import { useCurrentDate } from "../../redux/hooks";

import BookingsList from "./BookingsList";

import "./FindDialog.css";

function FindBookingDialogBody(): JSX.Element {
  const currentDate = useCurrentDate();
  const toDateObj = new Date(currentDate);
  toDateObj.setMonth(toDateObj.getMonth() + 1);
  const [nameOrId, setNameOrId] = useState("");
  const [fromDate, setFromDate] = useState(currentDate);
  const [toDate, setToDate] = useState(Utils.dateToString(toDateObj));
  const [forceFetchRequest, setForceFetchRequest] = useState(0);
  const [isLiveUpdateEnabled, setLiveUpdateEnabled] = useState(false);

  const isValidated = Utils.daysBetweenDates(fromDate, toDate) > 0;
  const datePickerClassName = isValidated ? "" : "invalid";

  const errorLabel = isValidated ?
    <></> :
    (
      <div className="error-label">
        <FontAwesomeIcon icon={faCircleExclamation} />
        Intervallo selezionato non corretto
      </div>
    );

  return (
    <>
      {errorLabel}
      <div className="row">
        <div>
          <label htmlFor="nameOrId" className="label">Nome / ID:</label>
          <input type={"text"} id="nameOrId" value={nameOrId} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNameOrId(event.target.value);
            setLiveUpdateEnabled(true);
          }} />
        </div>
        <div>
          <label htmlFor="from" className="label">Dal:</label>
          <DatePicker
            id="from"
            className={datePickerClassName}
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date(fromDate)}
            onChange={(date: Date) => { setFromDate(Utils.dateToString(date)); }}
          />
        </div>
        <div>
          <label htmlFor="to" className="label">Al:</label>
          <DatePicker
            id="to"
            className={datePickerClassName}
            locale="it"
            dateFormat="dd/MM/yyyy"
            selected={new Date(toDate)}
            onChange={(date: Date) => { setToDate(Utils.dateToString(date)); }}
          />
        </div>
        <div className="button" onClick={() => {
          setForceFetchRequest(forceFetchRequest + 1);
          setLiveUpdateEnabled(true);
        }}>Cerca</div>
      </div>
      <hr className="search-field-border" />
      <div className="bookings-container">
        <div className="row list-header">
          <div className="id">ID</div>
          <div className="name">Nome</div>
          <div className="from">Dal</div>
          <div className="to">Al</div>
        </div>
        <BookingsList
          nameOrId={nameOrId}
          from={fromDate}
          to={toDate}
          forceFetchRequest={forceFetchRequest}
          isLiveUpdateEnabled={isLiveUpdateEnabled}
          isValidated={isValidated}
        />
      </div>
    </>
  );
}

export default hot(module)(FindBookingDialogBody);
