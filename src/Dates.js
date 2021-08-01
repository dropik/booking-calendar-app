import React from 'react';
import { hot } from 'react-hot-loader';
import Day from './Day';
import "./Dates.css";

function Dates(props) {
  var columns = [];

  var dateCounter = new Date(props.date.getTime());
  for (var i = 0; i < props.columns; i++) {
    var day = dateCounter.getDate();

    columns.push(<Day day={day.toString().padStart(2, '0')} key={day}/>);

    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  return <div className="dates">{columns}</div>
}

export default hot(module)(Dates);