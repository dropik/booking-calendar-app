import React from "react";
import { hot } from "react-hot-loader";

import DatesContainer from "./DatesContainer";
import DateInput from "./DateInput";

import "./Header.css";

type Props = {
  onDateChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

function Header(props: Props) {
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
