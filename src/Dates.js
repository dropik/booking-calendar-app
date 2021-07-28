import React from 'react';
import { hot } from 'react-hot-loader';
import MonthYear from './MonthYear';
import Day from './Day';
import "./Dates.css";

function Dates(props) {
  var columns = [];
  columns.push(<MonthYear date={props.date} key="monthYear"/>);

  var dateCounter = new Date(props.date.getTime());
  for (var i = 0; i < props.columns; i++) {
    var day = dateCounter.getDate();
    var isLast = i == (props.columns - 1);

    columns.push(<Day isLast={isLast} day={day.toString().padStart(2, '0')} key={day}/>);

    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  return <div className="dates">{columns}</div>
}

export default hot(module)(Dates);