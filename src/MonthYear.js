import React from 'react';
import { hot } from 'react-hot-loader';
import "./MonthYear.css";

function MonthYear(props) {
  return (
    <div className="month-year">
      <span>Giugno <b>2021</b></span>
    </div>
  );
}

export default hot(module)(MonthYear);