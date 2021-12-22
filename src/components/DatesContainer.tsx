import React from "react";
import { hot } from "react-hot-loader";

import MonthYear from "./MonthYear";
import Dates from "./Dates";

import "./DatesContainer.css";

function DatesContainer() {
  return (
    <div className="dates-container">
      <MonthYear key="monthYear" />
      <Dates />
    </div>
  );
}

export default hot(module)(DatesContainer);