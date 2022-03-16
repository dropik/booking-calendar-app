import React from "react";
import { hot } from "react-hot-loader";
import { AnyAction } from "@reduxjs/toolkit";
import DatePicker, { registerLocale } from "react-datepicker";
import it from "date-fns/locale/it";

import * as Utils from "../../utils";
import { useAppDispatch, useCurrentDate } from "../../redux/hooks";
import * as TableSlice from "../../redux/tableSlice";

import SidemenuButton from "./SidemenuButton";
import SaveAndReset from "./SaveAndReset";

import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css";

registerLocale("it", it);

function DateInput(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentDate = useCurrentDate();

  const dateChangeHandler = getDateChangeHandler(dispatch);

  return (
    <>
      <SidemenuButton />
      <DatePicker
        locale="it"
        dateFormat="dd/MM/yyyy"
        selected={new Date(currentDate)}
        onChange={dateChangeHandler}
      />
      <SaveAndReset />
    </>
  );
}

function getDateChangeHandler(dispatch: React.Dispatch<AnyAction>): (date: Date) => void {
  return (date: Date) => {
    if (date !== null) {
      dispatch(TableSlice.changeDate({ date: Utils.dateToString(date) }));
    }
  };
}

export default hot(module)(DateInput);
