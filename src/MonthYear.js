import React from 'react';
import { hot } from 'react-hot-loader';
import "./monthYear.css";

function MonthYear(props) {
  var monthYear = props.date.toLocaleDateString("it-IT", { year: 'numeric', month: 'long'}).split(' ');
  var month = monthYear[0];
  month = month[0].toLocaleUpperCase() + month.substr(1, month.length - 1);
  var year = monthYear[1];

  return (
    <div className="month-year">
      <span>{month}<br/><b>{year}</b></span>
    </div>
  );
}

export default hot(module)(MonthYear);