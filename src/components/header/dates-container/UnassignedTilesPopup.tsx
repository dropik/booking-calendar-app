import React from "react";
import { hot } from "react-hot-loader";

import { useAppSelector } from "../../../redux/hooks";

import "./UnassignedTilesPopup.css";

function UnassignedTilesPopup(): JSX.Element {
  const show = useAppSelector((state) => state.unassignedTiles.selectedDate !== undefined);

  let className = "unassigned-tiles-popup";
  if (!show) {
    className += " hidden";
  }

  return (
    <div className={className}>
      <div className="unassigned-row">
        <div className="unassigned-cell"></div>
        <div className="unassigned-cell"></div>
        <div className="unassigned-cell"></div>
      </div>
    </div>
  );
}

export default hot(module)(UnassignedTilesPopup);
