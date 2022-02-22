import React, { useLayoutEffect, useMemo, useRef } from "react";
import { hot } from "react-hot-loader";

import { useScrollLeft, useDates } from "../../../redux/hooks";

import Day from "./Day";

import "./Dates.css";

function Dates(): JSX.Element {
  const scrollLeft = useScrollLeft();
  const dates = useDates();
  const ref = useRef<HTMLDivElement>(null);

  const dayCells = useDayCellsMemo(dates);

  useScrollEffect(ref, scrollLeft);

  return (
    <div ref={ref} className="dates">{dayCells}</div>
  );
}

function useDayCellsMemo(dates: Generator<string, void, void>): JSX.Element[] {
  return useMemo(() => {
    const dayCells: JSX.Element[] = [];
    for (const date of dates) {
      dayCells.push(
        <Day
          day={date.substring(8)}
          key={date}
        />
      );
    }
    return dayCells;
  }, [dates]);
}

function useScrollEffect(ref: React.RefObject<HTMLDivElement>, scrollLeft: number): void {
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${-scrollLeft}px`;
    }
  }, [ref, scrollLeft]);
}

export default hot(module)(Dates);
