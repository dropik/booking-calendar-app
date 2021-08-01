import React from 'react';
import { hot } from 'react-hot-loader';
import "./Day.css";

function Day(props) {
  return (
    <div className="day"><b>{props.day}</b></div>
  );
}

export default hot(module)(Day);