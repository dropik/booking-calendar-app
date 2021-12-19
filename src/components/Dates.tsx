import React, { useMemo } from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../redux/hooks";

import Day from "./Day";

import "./Dates.css";

function Dates() {
  const scrollLeft = useAppSelector(state => state.main.scrollLeft);
  const startDate = useAppSelector(state => state.main.startDate);
  const columns = useAppSelector(state => state.main.columns);

  const dates = useMemo(
    () => computeDates(startDate, columns),
    [startDate, columns]
  );
  return (
    <div style={{ left: -scrollLeft + "px" }} className="dates">
      {dates}
    </div>
  );
}

function computeDates(startDate: string, columns: number) {
  const dates = [];

  const dateCounter = new Date(startDate);
  for (let i = 0; i < columns; i++) {
    const day = dateCounter.getDate();
    dates.push(
      <Day
        day={day.toString().padStart(2, "0")}
        key={dateCounter.toDateString()}
      />
    );
    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  return dates;
}

export default hot(module)(Dates);
