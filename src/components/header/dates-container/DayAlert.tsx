import React from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import "./DayAlert.css";

type Props = {
  hasUnassignedTiles: boolean
};

function DayAlert({ hasUnassignedTiles }: Props): JSX.Element {
  return hasUnassignedTiles ?
    <span
      className="day-alert"
      title="Ci sono occupazioni non assegnati"
    >
      <FontAwesomeIcon icon={faCircleExclamation} />
    </span> :
    <></>;
}

export default hot(module)(DayAlert);
