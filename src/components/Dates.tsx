import React, { useMemo } from "react";
import { hot } from "react-hot-loader";

import { useColumns, useScrollLeft, useStartDate } from "../redux/hooks";

import Day from "./Day";

import "./Dates.css";

function Dates(): JSX.Element {
  const scrollLeft = useScrollLeft();
  const startDate = useStartDate();
  const columns = useColumns();
  const dates = useDatesMemo(startDate, columns);

  return (
    <div style={{ left: -scrollLeft + "px" }} className="dates">
      {dates}
    </div>
  );
}

function useDatesMemo(startDate: string, columns: number): JSX.Element[] {
  return useMemo(() => {
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
  }, [startDate, columns]);
}

export default hot(module)(Dates);
