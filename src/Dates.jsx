import React, { useMemo } from "react";
import { hot } from "react-hot-loader";
import Day from "./Day";
import { useSelector } from "react-redux";
import "./Dates.css";

function Dates() {
  const scrollLeft = useSelector(state => state.main.scrollLeft);
  const startDate = useSelector(state => state.main.startDate);
  const columns = useSelector(state => state.main.columns);

  var dates = useMemo(
    () => computeDates(startDate, columns),
    [startDate, columns]
  );
  return (
    <div style={{ left: -scrollLeft + "px" }} className="dates">
      {dates}
    </div>
  );
}

function computeDates(startDate, columns) {
  var dates = [];

  var dateCounter = new Date(startDate);
  for (var i = 0; i < columns; i++) {
    var day = dateCounter.getDate();
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
