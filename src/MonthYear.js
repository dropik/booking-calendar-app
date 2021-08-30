import React from 'react';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';
import "./MonthYear.css";

function MonthYear(props) {
  const currentDate = useSelector(state => state.currentDate.value);

  var currentDateObj = new Date(currentDate);
  var monthYear = currentDateObj.toLocaleDateString("it-IT", { year: 'numeric', month: 'long'}).split(' ');
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