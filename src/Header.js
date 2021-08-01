import React from 'react';
import { hot } from 'react-hot-loader';
import DatesContainer from './DatesContainer';
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <input type="date" id="fromDate" defaultValue={props.date.toISOString().substr(0,10)} onChange={props.onDateChange}/>
      </div>
      <DatesContainer date={props.date} columns={props.columns}/>
    </div>
  );
}

export default hot(module)(Header);