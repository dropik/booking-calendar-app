import React from 'react';
import { hot } from 'react-hot-loader';
import Dates from './Dates';
import "./Header.css";

function Header(props) {
  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <input type="date"/>
      </div>
      <Dates columns={props.columns}/>
    </div>
  );
}

export default hot(module)(Header);