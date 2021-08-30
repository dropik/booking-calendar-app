import React from 'react';
import { hot } from 'react-hot-loader';
import { useSelector } from 'react-redux';
import DatesContainer from './DatesContainer';
import "./Header.css";

function Header(props) {
  const currentDate = useSelector(state => state.currentDate.value);

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
        <input type="date" id="fromDate" value={currentDate} onChange={handleDateChange} />
      </div>
      <DatesContainer date={props.currentDate} startDate={props.startDate} columns={props.columns}/>
    </div>
  );
}

export default hot(module)(Header);