import React from "react";

import { useCurrentDate } from "../../redux/hooks";
import * as Utils from "../../utils";

import "./MonthYear.css";

export default function MonthYear(): JSX.Element {
  const currentDate = useCurrentDate();

  const currentDateObj = new Date(currentDate);
  const monthYear = currentDateObj
    .toLocaleDateString("it-IT", { year: "numeric", month: "long" })
    .split(" ");
  let month = monthYear[0];
  month = Utils.getFirstLetterUppercase(month);
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
