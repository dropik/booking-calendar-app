import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import Day from './Day';
import "./Dates.css";

function Dates(props) {
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    function handleScroll(event) {
      setScrollLeft(event.target.scrollLeft);
    }
    document.getElementById("tableContainer").addEventListener('scroll', handleScroll);
    return () => document.getElementById("tableContainer").removeEventListener('scroll', handleScroll);
  }, []);

  var columns = [];

  var dateCounter = new Date(props.date.getTime());
  for (var i = 0; i < props.columns; i++) {
    var day = dateCounter.getDate();

    columns.push(<Day day={day.toString().padStart(2, '0')} key={day}/>);

    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  return <div className="dates" style={{left: -scrollLeft + "px"}}>{columns}</div>
}

export default hot(module)(Dates);