import React, { memo } from "react";
import { hot } from "react-hot-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import "./Day.css";

type Props = {
  day: string
};

function Day(props: Props): JSX.Element {
  return (
    <div className="day">
      <b>{props.day}</b>
      <span className="day-alert" title="Ci sono occupazioni non assegnati"><FontAwesomeIcon icon={faCircleExclamation} /></span>
    </div>
  );
}

export default memo(hot(module)(Day));
