import React from "react";

import DateInput from "./header/DateInput";

import "./Header.css";

export default function Header(): JSX.Element {
  return (
    <div className="header">
      <div className="date-input">
        <DateInput />
      </div>
    </div>
  );
}
