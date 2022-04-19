import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import "./DayAlert.css";

type Props = {
  hasUnassignedTiles: boolean
};

export default function DayAlert({ hasUnassignedTiles }: Props): JSX.Element {
  return hasUnassignedTiles ?
    <span
      className="day-alert"
      title="Ci sono occupazioni non assegnati"
    >
      <FontAwesomeIcon icon={faCircleExclamation} />
    </span> :
    <></>;
}
