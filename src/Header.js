import React, { useEffect, useRef } from 'react';
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

  const inputRef = useRef(null);

  useEffect(() => {
    function handleScroll(event) {
      let newDate = new Date(props.startDate);
      let cellWidth = remToPx(4) + 1;
      let dateShift = Math.floor((event.target.scrollLeft + cellWidth / 2) / cellWidth);
      newDate.setDate(newDate.getDate() + dateShift);
      inputRef.current.value = newDate.toLocaleDateString('en-CA');
    }
    document.getElementById("tableContainer").addEventListener('scroll', handleScroll);
    return () => document.getElementById("tableContainer").removeEventListener('scroll', handleScroll);
  }, [props.startDate]);

  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <input ref={inputRef} type="date" id="fromDate" defaultValue={props.date.toLocaleDateString('en-CA')} onChange={handleDateChange} />
      </div>
      <DatesContainer date={props.date} startDate={props.startDate} columns={props.columns}/>
    </div>
  );
}

export default hot(module)(Header);