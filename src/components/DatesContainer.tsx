import React from "react";

import MonthYear from "./dates-container/MonthYear";
import Dates from "./dates-container/Dates";
import UnassignedTilesPopup from "./dates-container/UnassignedTilesPopup";

import "./DatesContainer.css";

export default function DatesContainer(): JSX.Element {
  return (
    <div className="dates-container">
      <MonthYear key="monthYear" />
      <Dates />
      <UnassignedTilesPopup />
    </div>
  );
}
