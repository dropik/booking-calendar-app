import React from "react";
import { hot } from "react-hot-loader";

import MonthYear from "./dates-container/MonthYear";
import Dates from "./dates-container/Dates";
import UnassignedTilesPopup from "./dates-container/UnassignedTilesPopup";

import "./DatesContainer.css";

function DatesContainer(): JSX.Element {
  return (
    <div className="dates-container">
      <MonthYear key="monthYear" />
      <Dates />
      <UnassignedTilesPopup />
    </div>
  );
}

export default hot(module)(DatesContainer);
