import React from 'react';
import { hot } from 'react-hot-loader';
import "./day.css";

function Day(props) {
  var className = "day";
  if (props.isLast) {
    className += " day-last";
  }

  return (
    <div className={className}><b>{props.day}</b></div>
  );
}

export default hot(module)(Day);