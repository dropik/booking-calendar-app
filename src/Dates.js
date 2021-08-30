import React, { useMemo } from 'react';
import { hot } from 'react-hot-loader';
import Day from './Day';
import { useSelector } from 'react-redux';
import "./Dates.css";

function Dates(props) {
  const scrollLeft = useSelector(state => state.horizontalScroll.scrollLeft);
  var dates = useMemo(() => computeDates(props.startDate, props.columns), [props.startDate, props.columns]);
  return (
    <div style={{left: -scrollLeft + "px"}} className="dates">{dates}</div>
  );
}

function computeDates(startDate, columns) {
  var dates = [];

  var dateCounter = new Date(startDate.getTime());
  for (var i = 0; i < columns; i++) {
    var day = dateCounter.getDate();
    dates.push(<Day day={day.toString().padStart(2, '0')} key={dateCounter.toDateString()}/>);
    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  return dates;
}

export default hot(module)(Dates);