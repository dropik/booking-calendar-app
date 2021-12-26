import React from "react";
import { hot } from "react-hot-loader";

import DatesContainer from "./DatesContainer";
import DateInput from "./DateInput";

import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <DateInput />
      </div>
      <DatesContainer />
    </div>
  );
}

export default hot(module)(Header);
