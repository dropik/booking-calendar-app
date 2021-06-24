import React from 'react';
import { hot } from 'react-hot-loader';
import MonthYear from './MonthYear';
import Day from './Day';
import "./Dates.css";

function Dates(props) {
  var columns = [];
  columns.push(<MonthYear key="giugno2021"/>);

  var days = ['26', '27', '28', '29', '30', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'];

  for (var i = 0; i < props.columns; i++) {
    var isLast = i == (props.columns - 1);
    columns.push(<Day isLast={isLast} day={days[i]} key={i}/>);
  }

  return <div className="dates">{columns}</div>
}

export default hot(module)(Dates);