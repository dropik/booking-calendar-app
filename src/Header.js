import React from 'react';
import { hot } from 'react-hot-loader';
import DatesContainer from './DatesContainer';
import "./Header.css";

function Header(props) {
  function handleDateChange(event) {
    if (!event.target.value) {
      event.preventDefault();
    } else {
      props.onDateChange(event);
    }
  }

  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <input type="date" id="fromDate" defaultValue={props.date.toLocaleDateString('en-CA')} onChange={handleDateChange} />
      </div>
      <DatesContainer date={props.date} startDate={props.startDate} columns={props.columns}/>
    </div>
  );
}

export default hot(module)(Header);