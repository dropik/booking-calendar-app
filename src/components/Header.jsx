import React from "react";
import { hot } from "react-hot-loader";
import PropTypes from "prop-types";

import DatesContainer from "./DatesContainer";
import DateInput from "./DateInput";

import "./Header.css";

function Header({ onDateChange }) {
  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <DateInput onDateChange={onDateChange} />
      </div>
      <DatesContainer />
    </div>
  );
}

Header.propTypes = {
  onDateChange: PropTypes.func.isRequired
};

export default hot(module)(Header);
