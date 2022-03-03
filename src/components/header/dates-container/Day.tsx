import React, { memo } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { useHasUnassignedTiles } from "../../../redux/hooks";

import "./Day.css";

type Props = {
  x: string
};

function Day(props: Props): JSX.Element {
  const hasUnassignedTiles = useHasUnassignedTiles(props.x);

  const day = props.x.substring(8);

  const alert = hasUnassignedTiles ?
    <span
      className="day-alert"
      title="Ci sono occupazioni non assegnati"
    >
      <FontAwesomeIcon icon={faCircleExclamation} />
    </span> :
    <></>;

  return (
    <div className="day">
      <b>{day}</b>
      {alert}
    </div>
  );
}

export default memo(hot(module)(Day));
