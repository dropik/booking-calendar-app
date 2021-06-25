import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import Dates from './Dates';
import "./Header.css";

function Header(props) {
  const [date, setDate] = useState(new Date());

  function handleDateChange(event) {
    var date = new Date(event.target.value);
    setDate(date);
  }

  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <input type="date" id="fromDate" defaultValue={date.toISOString().substr(0,10)} onChange={handleDateChange}/>
      </div>
      <Dates date={date} columns={props.columns}/>
    </div>
  );
}

export default hot(module)(Header);