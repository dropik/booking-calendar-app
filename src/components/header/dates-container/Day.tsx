import React, { memo } from "react";
import { hot } from "react-hot-loader";

import "./Day.css";

type Props = {
  day: string
};

function Day(props: Props): JSX.Element {
  return (
    <div className="day">
      <b>{props.day}</b>
    </div>
  );
}

export default memo(hot(module)(Day));
