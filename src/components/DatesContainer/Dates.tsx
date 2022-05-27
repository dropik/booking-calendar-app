import React, { useMemo, useRef } from "react";

import { useDates } from "../../redux/hooks";

import Day from "./Day";

import "./Dates.css";

export default function Dates(): JSX.Element {
  const dates = useDates();
  const ref = useRef<HTMLDivElement>(null);

  const dayCells = useDayCellsMemo(dates);

  return (
    <div ref={ref} className="dates">{dayCells}</div>
  );
}

function useDayCellsMemo(dates: Generator<string, void, void>): JSX.Element[] {
  return useMemo(() => {
    const dayCells: JSX.Element[] = [];
    for (const date of dates) {
      dayCells.push(<Day key={date} x={date} />);
    }
    return dayCells;
  }, [dates]);
}
