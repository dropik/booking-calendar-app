import React from "react";
import { hot } from "react-hot-loader";

import "./OccupationInfo.css";

function OccupationInfo(): JSX.Element {
  return (
    <div className="occupation-info">
      <p className="occupaiton-info-header">Ivan Petrov</p>
      <div className="occupation-info-data">
        <p>Camera: doppia</p>
        <p>Ospiti: 2</p>
        <p>Arrivo: 25/02/2022</p>
        <p>Partenza: 27/02/2022</p>
      </div>
    </div>
  );
}

export default hot(module)(OccupationInfo);
