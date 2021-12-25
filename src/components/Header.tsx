import React from "react";
import { hot } from "react-hot-loader";

import DatesContainer from "./DatesContainer";
import DateInput from "./DateInput";

import "./Header.css";

type Props = {
  onDateChange: (date: Date) => void
};

function Header(props: Props): JSX.Element {
  return (
    <div className="header">
      <div className="data-input">
        <span>From: </span>
        <DateInput onDateChange={props.onDateChange} />
      </div>
      <DatesContainer />
    </div>
  );
}

export default hot(module)(Header);
