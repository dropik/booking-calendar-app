import React from "react";
import { hot } from "react-hot-loader";

import "./UnassignedTilesPopup.css";

function UnassignedTilesPopup(): JSX.Element {
  return (
    <div className="unassigned-tiles-popup">
      <div className="unassigned-row">
        <div className="unassigned-cell"></div>
        <div className="unassigned-cell"></div>
        <div className="unassigned-cell"></div>
      </div>
    </div>
  );
}

export default hot(module)(UnassignedTilesPopup);
