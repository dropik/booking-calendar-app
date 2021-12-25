import React from "react";
import { hot } from "react-hot-loader";

import { useCurrentDate } from "../redux/hooks";

import "./MonthYear.css";

function MonthYear(): JSX.Element {
  const currentDate = useCurrentDate();

  const currentDateObj = new Date(currentDate);
  const monthYear = currentDateObj
    .toLocaleDateString("it-IT", { year: "numeric", month: "long" })
    .split(" ");
  let month = monthYear[0];
  month = month[0].toLocaleUpperCase() + month.substring(1, month.length);
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
