import React, { memo } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import "./Day.css";

type Props = {
  x: string
};

function Day(props: Props): JSX.Element {
  const day = props.x.substring(8);
  return (
    <div className="day">
      <b>{day}</b>
      <span className="day-alert" title="Ci sono occupazioni non assegnati"><FontAwesomeIcon icon={faCircleExclamation} /></span>
    </div>
  );
}

export default memo(hot(module)(Day));
