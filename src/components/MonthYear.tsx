import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../redux/hooks";

import "./MonthYear.css";

function MonthYear() {
  const currentDate = useAppSelector(state => state.main.currentDate);

  const currentDateObj = new Date(currentDate);
  const monthYear = currentDateObj
    .toLocaleDateString("it-IT", { year: "numeric", month: "long" })
    .split(" ");
  let month = monthYear[0];
  month = month[0].toLocaleUpperCase() + month.substr(1, month.length - 1);
  const year = monthYear[1];

  return (
    <div className="month-year">
      <span>
        {month}
        <br />
        <b>{year}</b>
      </span>
    </div>
  );
}

export default hot(module)(MonthYear);
