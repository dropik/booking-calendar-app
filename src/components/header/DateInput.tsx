import React from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";
import DatePicker, { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";

import * as Utils from "../../utils";
import { useAppDispatch, useCurrentDate } from "../../redux/hooks";

import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";

registerLocale("it", it);

function DateInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();

  const dateChangeHandler = getDateChangeHandler(dispatch);

  return (
    <DatePicker
      locale="it"
      dateFormat="dd/MM/yyyy"
      selected={new Date(currentDate)}
      onChange={dateChangeHandler}
    />
  );
}

function getDateChangeHandler(dispatch: React.Dispatch<AnyAction>): (date: Date) => void {
  return (date: Date) => {
    if (date !== null) {
      dispatch({ type: "changeDate", payload: { date: Utils.dateToString(date) } });
    }
  };
}

export default hot(module)(DateInput);
