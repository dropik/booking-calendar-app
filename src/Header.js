import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader';
import DatesContainer from './DatesContainer';
import "./Header.css";
import { remToPx } from './utils';

function Header(props) {
  function handleDateChange(event) {
    if (!event.target.value) {
      event.preventDefault();
    } else {
      props.onDateChange(event);
    }
  }

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    function handleScroll(event) {
      let newDate = new Date(props.startDate);
      let cellWidth = remToPx(4) + 1;
      let dateShift = Math.floor((event.target.scrollLeft + cellWidth / 2) / cellWidth);
      newDate.setDate(newDate.getDate() + dateShift);
      setCurrentDate(newDate);
    }
    document.getElementById("tableContainer").addEventListener('scroll', handleScroll);
    return () => document.getElementById("tableContainer").removeEventListener('scroll', handleScroll);
  }, [props.startDate]);

  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <input type="date" id="fromDate" value={currentDate.toLocaleDateString('en-CA')} onChange={handleDateChange} />
      </div>
      <DatesContainer date={currentDate} startDate={props.startDate} columns={props.columns}/>
    </div>
  );
}

export default hot(module)(Header);